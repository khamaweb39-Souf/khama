const express = require('express');
const router = express.Router();
const { prisma } = require('../lib/prisma');
const { authenticate } = require('../middleware/auth');

// 📊 إحصائيات المتجر للبائع
router.get('/stats', authenticate, async (req, res) => {
  try {
    const store = await prisma.store.findUnique({
      where: { userId: req.user.id }
    });
    
    if (!store) return res.status(404).json({ error: 'لم يتم العثور على متجر' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [todayOrders, balance, visitors] = await Promise.all([
      prisma.order.aggregate({
        where: {
          storeId: store.id,
          createdAt: { gte: today },
          status: { not: 'CANCELLED' }
        },
        _sum: { total: true },
        _count: true
      }),
      prisma.wallet.findUnique({
        where: { userId: req.user.id },
        select: { balance: true }
      }),
      prisma.product.aggregate({
        where: { storeId: store.id },
        _sum: { viewCount: true }
      })
    ]);
    
    res.json({
      todaySales: todayOrders._sum.total || 0,
      newOrders: todayOrders._count,
      balance: balance?.balance || 0,
      visitors: visitors._sum.viewCount || 0,
      salesTrend: 12 // نسبة وهمية حالياً
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'فشل جلب الإحصائيات' });
  }
});

module.exports = router;
