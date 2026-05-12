const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// تخزين صور المنتجات
const productStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'khama/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 1200, height: 1200, crop: 'limit' },
      { quality: 'auto:good' },
      { fetch_format: 'auto' }
    ],
    public_id: `${req.user?.id || 'anonymous'}/${Date.now()}-${file.originalname.split('.')[0]}`
  })
});

// تخزين صور البروفايل
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'khama/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [
      { width: 400, height: 400, crop: 'fill', gravity: 'face' },
      { quality: 'auto:good' }
    ]
  }
});

// تخزين الفيديو
const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'khama/videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'webm'],
    transformation: [
      { quality: 'auto:low' },
      { duration: 60 }
    ]
  }
});

module.exports = {
  uploadProduct: multer({ 
    storage: productStorage,
    limits: { fileSize: 5 * 1024 * 1024 } 
  }),
  uploadAvatar: multer({ 
    storage: avatarStorage,
    limits: { fileSize: 2 * 1024 * 1024 } 
  }),
  uploadVideo: multer({ 
    storage: videoStorage,
    limits: { fileSize: 50 * 1024 * 1024 } 
  })
};
