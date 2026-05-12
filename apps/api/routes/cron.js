const express = require('express');
const router = express.Router();
const { recalculateBadges } = require('../services/badgeEngine');

router.get('/update-badges', async (req, res) => {
  // للتبسيط في البيئة المحلية، سنتجاوز التحقق من الـ Token
  try {
    await recalculateBadges();
    res.json({ success: true, message: 'تم تحديث الشارات لجميع المستخدمين' });
  } catch (error) {
    res.status(500).json({ error: 'فشل تحديث الشارات' });
  }
});

module.exports = router;
