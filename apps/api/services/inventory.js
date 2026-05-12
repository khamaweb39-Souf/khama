const { prisma } = require('../lib/prisma');

/**
 * تقليل كمية المخزون عند الطلب
 */
async function decrementStock(productId, quantity, variantId = null) {
  try {
    if (variantId) {
      const variant = await prisma.productVariant.update({
        where: { id: variantId },
        data: { stock: { decrement: quantity } }
      });
      
      if (variant.stock <= 5) {
        await sendLowStockAlert(productId, variant);
      }
    } else {
      const product = await prisma.product.update({
        where: { id: productId },
        data: { stock: { decrement: quantity } }
      });
      
      if (product.stock <= product.lowStockThreshold) {
        await sendLowStockAlert(productId);
      }
    }
  } catch (error) {
    console.error('Stock decrement error:', error);
  }
}

/**
 * إرسال تنبيه في حال انخفاض المخزون
 */
async function sendLowStockAlert(productId, variant = null) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { store: { include: { user: true } } }
  });
  
  // في الـ MVP: سنكتفي بالطباعة في الـ Console
  // في الإنتاج: يمكن إرسال إشعار للموبايل أو بريد إلكتروني
  const itemName = variant ? `${product.title.ar} (${variant.name})` : product.title.ar;
  console.warn(`⚠️ تنبيه: مخزون المنتج [${itemName}] منخفض جداً!`);
}

module.exports = { decrementStock };
