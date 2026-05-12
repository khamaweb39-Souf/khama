const express = require('express');
const router = express.Router();
const { prisma } = require('../lib/prisma');
const { authenticate } = require('../middleware/auth');

// ➕ إضافة تقييم جديد
router.post('/', authenticate, async (req, res) => {
  try {
    const { productId, rating, comment, images } = req.body;
    
    // 1. التحقق من أن المستخدم اشترى المنتج فعلاً (Verified Purchase)
    const orderWithProduct = await prisma.order.findFirst({
      where: {
        userId: req.user.id,
        status: 'DELIVERED',
        items: { some: { productId } }
      }
    });

    const isVerified = !!orderWithProduct;

    // 2. إنشاء التقييم
    const review = await prisma.review.create({
      data: {
        productId,
        userId: req.user.id,
        rating: parseInt(rating),
        comment,
        images: images || [],
        isVerified
      }
    });

    // 3. تحديث متوسط تقييم المنتج
    const productReviews = await prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: true
    });

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: productReviews._avg.rating || 0,
        // يمكن إضافة reviewCount إذا كان موجوداً في الـ Schema
      }
    });

    // 4. تحديث متوسط تقييم المتجر
    const product = await prisma.product.findUnique({ where: { id: productId }, select: { storeId: true } });
    const storeReviews = await prisma.review.aggregate({
      where: { product: { storeId: product.storeId } },
      _avg: { rating: true },
      _count: true
    });

    await prisma.store.update({
      where: { id: product.storeId },
      data: {
        rating: storeReviews._avg.rating || 0,
        reviewCount: storeReviews._count
      }
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Review error:', error);
    res.status(500).json({ error: 'فشل إضافة التقييم' });
  }
});

// 📋 جلب تقييمات منتج معين
router.get('/product/:productId', async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: { productId: req.params.productId },
    include: { user: { select: { fullName: true, avatar: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(reviews);
});

module.exports = router;
