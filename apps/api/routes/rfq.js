const express = require('express');
const router = express.Router();
const { prisma } = require('../lib/prisma');
const { authenticate, authorize } = require('../middleware/auth');

// ➕ إنشاء طلب RFQ جديد
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      categoryId,
      productType,
      specifications,
      description,
      quantity,
      unit,
      referenceImages,
      deliveryDate,
      urgency
    } = req.body;
    
    const rfq = await prisma.rFQRequest.create({
      data: {
        buyerId: req.user.id,
        categoryId,
        productType,
        specifications: typeof specifications === 'string' ? JSON.parse(specifications) : specifications,
        description,
        quantity: parseInt(quantity),
        unit,
        referenceImages: referenceImages || [],
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        urgency,
        status: 'SUBMITTED'
      }
    });
    
    res.status(201).json(rfq);
  } catch (error) {
    console.error('RFQ Create error:', error);
    res.status(500).json({ error: 'فشل إنشاء طلب عرض السعر' });
  }
});

// 📋 طلباتي (للمشتري)
router.get('/my-requests', authenticate, async (req, res) => {
  const requests = await prisma.rFQRequest.findMany({
    where: { buyerId: req.user.id },
    include: {
      responses: {
        include: {
          supplier: { select: { name: true, isVerified: true, rating: true } }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  res.json(requests);
});

// 🏭 الطلبات المتاحة (للمصانع والمستوردين)
router.get('/available',
  authenticate,
  authorize('FACTORY', 'IMPORTER'),
  async (req, res) => {
    const requests = await prisma.rFQRequest.findMany({
      where: { status: 'SUBMITTED' },
      include: {
        buyer: { select: { fullName: true, wilaya: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  }
);

// 💰 تقديم عرض سعر من مورد
router.post('/:rfqId/respond',
  authenticate,
  authorize('FACTORY', 'IMPORTER'),
  async (req, res) => {
    try {
      const { rfqId } = req.params;
      const { unitPrice, deliveryDate, notes, attachments } = req.body;
      
      const rfq = await prisma.rFQRequest.findUnique({ where: { id: rfqId } });
      if (!rfq) return res.status(404).json({ error: 'الطلب غير موجود' });
      
      const store = await prisma.store.findUnique({ where: { userId: req.user.id } });
      
      const response = await prisma.rFQResponse.create({
        data: {
          rfqId,
          supplierId: store.id,
          unitPrice: parseFloat(unitPrice),
          totalPrice: parseFloat(unitPrice) * rfq.quantity,
          deliveryDate: new Date(deliveryDate),
          notes,
          attachments: attachments || []
        }
      });
      
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: 'فشل تقديم عرض السعر' });
    }
  }
);

// ✅ قبول عرض سعر
router.post('/responses/:responseId/accept', authenticate, async (req, res) => {
  try {
    const response = await prisma.rFQResponse.update({
      where: { id: req.params.responseId },
      data: { status: 'ACCEPTED' }
    });
    
    await prisma.rFQRequest.update({
      where: { id: response.rfqId },
      data: { status: 'ACCEPTED' }
    });
    
    // رفض العروض الأخرى تلقائياً
    await prisma.rFQResponse.updateMany({
      where: { rfqId: response.rfqId, id: { not: response.id } },
      data: { status: 'REJECTED' }
    });
    
    res.json({ success: true, message: 'تم قبول العرض بنجاح' });
  } catch (error) {
    res.status(500).json({ error: 'فشل قبول العرض' });
  }
});

module.exports = router;
