const express = require('express');
const { prisma } = require('../lib/prisma');

const router = express.Router();

// ─── الحصول على جميع التصنيفات ────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { level, parentId } = req.query;

    const where = { isActive: true };
    if (level) where.level = parseInt(level);
    if (parentId) where.parentId = parentId;

    const categories = await prisma.category.findMany({
      where,
      include: {
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
        attributes: true,
        _count: { select: { products: true } },
      },
      orderBy: { sortOrder: 'asc' },
    });

    res.json(categories);
  } catch (err) {
    console.error('Categories error:', err);
    res.status(500).json({ error: 'خطأ في الخادم' });
  }
});

// ─── شجرة التصنيفات الكاملة ───────────────────────────────────────────────────
router.get('/tree', async (req, res) => {
  try {
    const roots = await prisma.category.findMany({
      where: { level: 1, isActive: true },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
          include: {
            children: {
              where: { isActive: true },
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    res.json(roots);
  } catch (err) {
    console.error('Category tree error:', err);
    res.status(500).json({ error: 'خطأ في الخادم' });
  }
});

module.exports = router;
