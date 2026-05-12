const express = require('express');
const router = express.Router();
const { prisma } = require('../lib/prisma');

router.get('/health', async (req, res) => {
  try {
    // التأكد من اتصال قاعدة البيانات بطلب خفيف
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: 'connected',
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

module.exports = router;
