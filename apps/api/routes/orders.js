const express = require('express');
const router = express.Router();
const { prisma } = require('../lib/prisma');
const { authenticate } = require('../middleware/auth');
const { decrementStock } = require('../services/inventory');

// ➕ إنشاء طلب جديد (تلقائي التقسيم حسب المتجر)
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      items, // [{ productId, variantId?, quantity }]
      customerName,
      customerPhone,
      address,
      wilaya,
      commune,
      paymentMethod,
      couponCode
    } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'السلة فارغة' });
    }
    
    // حساب المجموع والتحقق من التوفر
    let subtotal = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { variants: true, store: true }
      });
      
      if (!product) return res.status(400).json({ error: `المنتج ${item.productId} غير موجود` });
      
      const stock = item.variantId
        ? product.variants.find(v => v.id === item.variantId)?.stock
        : product.stock;
      
      if (stock < item.quantity) {
        return res.status(400).json({ error: `المنتج ${product.title.ar} غير متوفر بالكمية المطلوبة` });
      }
      
      const price = item.variantId
        ? product.variants.find(v => v.id === item.variantId)?.price || product.price
        : product.price;
      
      subtotal += price * item.quantity;
      
      orderItems.push({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price,
        storeId: product.storeId
      });
    }
    
    const shippingCost = calculateShipping(wilaya);
    const total = subtotal + shippingCost;
    
    // تقسيم العناصر حسب المتجر
    const storeOrdersMap = {};
    for (const item of orderItems) {
      if (!storeOrdersMap[item.storeId]) storeOrdersMap[item.storeId] = [];
      storeOrdersMap[item.storeId].push(item);
    }
    
    const createdOrders = [];
    
    // إنشاء طلب منفصل لكل متجر (لأن كل بائع يشحن بضاعته بشكل مستقل)
    for (const [storeId, storeItems] of Object.entries(storeOrdersMap)) {
      const storeSubtotal = storeItems.reduce((s, i) => s + i.price * i.quantity, 0);
      const orderNumber = generateOrderNumber();
      
      const order = await prisma.order.create({
        data: {
          orderNumber,
          userId: req.user.id,
          storeId,
          customerName,
          customerPhone,
          address,
          wilaya,
          commune,
          subtotal: storeSubtotal,
          shippingCost: shippingCost / Object.keys(storeOrdersMap).length, // توزيع الشحن بالتساوي (MVP)
          total: storeSubtotal + (shippingCost / Object.keys(storeOrdersMap).length),
          paymentMethod,
          status: 'PENDING',
          items: {
            create: storeItems.map(item => ({
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      });
      
      createdOrders.push(order);
      
      // تحديث المخزون
      for (const item of storeItems) {
        await decrementStock(item.productId, item.quantity, item.variantId);
      }
    }
    
    res.status(201).json({ orders: createdOrders, grandTotal: total });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'فشل إنشاء الطلب' });
  }
});

// 📋 طلباتي (للمشتري)
router.get('/my-orders', authenticate, async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: {
      items: { include: { product: { select: { title: true, images: true } } } },
      store: { select: { name: true, slug: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
});

function generateOrderNumber() {
  return `KH${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
}

function calculateShipping(wilaya) {
  const zones = { '16': 400, '06': 500, '31': 500 }; // أمثلة لتكاليف الشحن
  return zones[wilaya] || 600;
}

module.exports = router;
