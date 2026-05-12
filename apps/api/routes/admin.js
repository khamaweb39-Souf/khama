const express = require('express');
const router = express.Router();
const { prisma } = require('../lib/prisma');
const { authenticate, authorize } = require('../middleware/auth');

// حماية كافة المسارات التالية للأدمن فقط
router.use(authenticate, authorize('ADMIN'));

// 📊 إحصائيات المنصة العامة
router.get('/stats', async (req, res) => {
  try {
    const [userCount, storeCount, orderCount, revenue] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: 'DELIVERED' },
        _sum: { total: true }
      })
    ]);

    res.json({
      users: userCount,
      stores: storeCount,
      orders: orderCount,
      revenue: revenue._sum.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'فشل جلب إحصائيات النظام' });
  }
});

// 🏪 طلبات توثيق المتاجر
router.get('/verifications', async (req, res) => {
  const pendingStores = await prisma.store.findMany({
    where: { isVerified: false },
    include: { user: { select: { fullName: true, email: true, phone: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(pendingStores);
});

// ✅ الموافقة على توثيق متجر
router.post('/verifications/:storeId/approve', async (req, res) => {
  const store = await prisma.store.update({
    where: { id: req.params.storeId },
    data: { isVerified: true }
  });

  // إضافة شارة "موثق" للمستخدم
  const verifiedBadge = await prisma.badge.findUnique({ where: { code: 'VERIFIED' } });
  if (verifiedBadge) {
    await prisma.userBadge.create({
      data: { userId: store.userId, badgeId: verifiedBadge.id }
    });
  }

  res.json({ success: true, message: 'تم توثيق المتجر ومنح الشارة بنجاح' });
});

// 📦 مراجعة المنتجات المعلقة
router.get('/pending-products', async (req, res) => {
  const products = await prisma.product.findMany({
    where: { status: 'PENDING' },
    include: { store: { select: { name: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(products);
});

// 🚀 الموافقة على نشر منتج
router.patch('/products/:id/approve', async (req, res) => {
  await prisma.product.update({
    where: { id: req.params.id },
    data: { status: 'ACTIVE' }
  });
  res.json({ success: true });
});

module.exports = router;
