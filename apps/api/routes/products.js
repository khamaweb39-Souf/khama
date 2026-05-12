const express = require('express');
const router = express.Router();
const { prisma } = require('../lib/prisma');
const { authenticate, authorize } = require('../middleware/auth');
const { uploadProduct } = require('../middleware/upload');

// 🔍 قائمة المنتجات مع نظام فلاتر متقدم
router.get('/', async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      wilaya,
      isB2B,
      verified,
      madeInAlgeria,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 20
    } = req.query;
    
    const where = {
      status: 'ACTIVE',
      deletedAt: null,
      ...(category && { categoryId: category }),
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
      ...(madeInAlgeria === 'true' && { badges: { has: 'MADE_IN_ALGERIA' } }),
      ...(verified === 'true' && { store: { isVerified: true } }),
      ...(wilaya && { store: { user: { wilaya } } }),
    };
    
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          store: {
            select: { name: true, slug: true, isVerified: true, rating: true }
          },
          category: {
            select: { name: true, slug: true }
          }
        },
        orderBy: { [sort]: order },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit)
      }),
      prisma.product.count({ where })
    ]);
    
    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'فشل جلب المنتجات' });
  }
});

// 📄 تفاصيل المنتج وزيادة عدد المشاهدات
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        store: {
          select: {
            id: true, name: true, slug: true, logo: true,
            isVerified: true, rating: true, reviewCount: true
          }
        },
        category: true,
        variants: true,
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: { select: { fullName: true, avatar: true } }
          }
        }
      }
    });
    
    if (!product) return res.status(404).json({ error: 'المنتج غير موجود' });
    
    // زيادة عدد المشاهدات بشكل آلي (Background update)
    prisma.product.update({
      where: { id: req.params.id },
      data: { viewCount: { increment: 1 } }
    }).catch(e => console.error('Error updating view count:', e));
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'فشل جلب بيانات المنتج' });
  }
});

// ➕ إضافة منتج جديد (خاص بالبائعين والمصانع)
router.post('/',
  authenticate,
  authorize('SELLER', 'FACTORY', 'IMPORTER'),
  uploadProduct.array('images', 8),
  async (req, res) => {
    try {
      const { title, description, categoryId, price, pricingType, tieredPricing,
              stock, attributes, badges, acceptsCustom, variants } = req.body;
      
      const store = await prisma.store.findUnique({
        where: { userId: req.user.id }
      });
      
      if (!store) return res.status(400).json({ error: 'يجب إنشاء متجر أولاً' });
      
      const images = req.files?.map(f => f.path) || [];
      const sku = `${store.id.slice(-4)}-${Date.now()}`;
      
      const product = await prisma.product.create({
        data: {
          storeId: store.id,
          categoryId,
          sku,
          title: typeof title === 'string' ? JSON.parse(title) : title,
          description,
          images,
          pricingType,
          price: price ? parseFloat(price) : null,
          tieredPricing: tieredPricing ? (typeof tieredPricing === 'string' ? JSON.parse(tieredPricing) : tieredPricing) : null,
          stock: parseInt(stock) || 0,
          attributes: attributes ? (typeof attributes === 'string' ? JSON.parse(attributes) : attributes) : null,
          badges: badges ? (typeof badges === 'string' ? JSON.parse(badges) : badges) : [],
          acceptsCustom: acceptsCustom === 'true',
          status: 'PENDING', // مراجعة الإدارة أولاً
          variants: variants ? {
            create: typeof variants === 'string' ? JSON.parse(variants) : variants
          } : undefined
        },
        include: { variants: true }
      });
      
      res.status(201).json(product);
    } catch (error) {
      console.error('Product create error:', error);
      res.status(500).json({ error: 'فشل إنشاء المنتج' });
    }
  }
);

module.exports = router;
