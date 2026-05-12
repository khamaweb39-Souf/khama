const express = require('express');
const router = express.Router();
const { uploadProduct, uploadAvatar } = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const { authenticate } = require('../middleware/auth');

// رفع صور المنتج (حتى 8 صور) - يتطلب تسجيل دخول
router.post('/product-images', 
  authenticate,
  uploadProduct.array('images', 8),
  async (req, res) => {
    try {
      const urls = req.files.map(file => ({
        url: file.path,
        publicId: file.filename
      }));
      res.json({ success: true, images: urls });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'فشل رفع الصور' });
    }
  }
);

// رفع صورة البروفايل
router.post('/avatar',
  authenticate,
  uploadAvatar.single('avatar'),
  async (req, res) => {
    try {
      res.json({ 
        success: true, 
        url: req.file.path,
        publicId: req.file.filename 
      });
    } catch (error) {
      res.status(500).json({ error: 'فشل رفع الصورة' });
    }
  }
);

// حذف صورة
router.delete('/image/:publicId',
  authenticate,
  async (req, res) => {
    try {
      // التأكد من أن الـ publicId يبدأ بمسار المشروع للحماية
      if (!req.params.publicId.startsWith('khama/')) {
        return res.status(403).json({ error: 'غير مسموح بحذف هذا الملف' });
      }
      await cloudinary.uploader.destroy(req.params.publicId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'فشل حذف الصورة' });
    }
  }
);

module.exports = router;
