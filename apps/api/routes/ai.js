const express = require('express');
const router = express.Router();
const ai = require('../services/ai');
const { authenticate } = require('../middleware/auth');

// تحليل طلب عرض السعر بالذكاء الاصطناعي
router.post('/analyze-rfq', authenticate, async (req, res) => {
  try {
    const analysis = await ai.analyzeRFQ(req.body);
    res.json(analysis);
  } catch (error) {
    console.error('AI Concierge Error:', error);
    
    // Fallback للنظام البسيط في حالة فشل الـ AI
    try {
      const fallback = require('../services/ai/rules');
      const result = fallback.analyzeRFQ(req.body);
      res.json({ ...result, note: 'تم استخدام النظام التقليدي بسبب ضغط على خوادم الذكاء الاصطناعي.' });
    } catch (e) {
      res.status(500).json({ error: 'فشل تحليل الطلب' });
    }
  }
});

// اقتراح أسئلة توضيحية للمواصفات
router.post('/clarify-specs', authenticate, (req, res) => {
  const rules = require('../services/ai/rules');
  const questions = rules.generateClarifications(req.body);
  res.json({ questions });
});

module.exports = router;
