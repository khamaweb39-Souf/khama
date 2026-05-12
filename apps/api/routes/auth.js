const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../lib/prisma');
const { generateTokens } = require('../config/auth');
const { generateOTP, sendOTP, verifyOTP } = require('../services/otp');

// إرسال رمز التحقق (OTP)
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'رقم الهاتف مطلوب' });
    
    const otp = generateOTP();
    await sendOTP(phone, otp);
    
    res.json({ success: true, message: 'تم إرسال رمز التحقق' });
  } catch (error) {
    res.status(500).json({ error: 'فشل إرسال الرمز' });
  }
});

// التحقق من رمز الـ OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  
  const result = verifyOTP(phone, otp);
  if (!result.valid) {
    return res.status(400).json({ error: result.error });
  }
  
  res.json({ success: true, verified: true });
});

// تسجيل مستخدم جديد
router.post('/register', async (req, res) => {
  const { phone, email, password, fullName, userType, wilaya, storeData } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        phone,
        email,
        password: hashedPassword,
        fullName,
        userType,
        wilaya,
        isVerified: false,
        wallet: { create: {} },
        // إنشاء المتجر تلقائياً إذا لم يكن مستهلكاً عادياً
        ...(userType !== 'CONSUMER' && storeData && {
          store: {
            create: {
              name: storeData.name,
              slug: storeData.name.toLowerCase().replace(/\s+/g, '-'),
              specialization: storeData.specialization || []
            }
          }
        })
      },
      include: { store: true }
    });
    
    const tokens = generateTokens(user);
    
    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        userType: user.userType,
        store: user.store
      },
      ...tokens
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'رقم الهاتف أو البريد مستخدم مسبقاً' });
    }
    console.error('Register error:', error);
    res.status(500).json({ error: 'حدث خطأ في التسجيل' });
  }
});

// تسجيل الدخول
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { phone },
      include: { store: true }
    });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'رقم الهاتف أو كلمة المرور غير صحيحة' });
    }
    
    if (!user.isActive) {
      return res.status(403).json({ error: 'هذا الحساب موقوف حالياً' });
    }
    
    const tokens = generateTokens(user);
    
    res.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        userType: user.userType,
        store: user.store
      },
      ...tokens
    });
  } catch (error) {
    res.status(500).json({ error: 'فشل تسجيل الدخول' });
  }
});

// تجديد الـ Access Token باستخدام الـ Refresh Token
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: 'Refresh token مطلوب' });
  
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET + '_refresh'));
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'الجلسة غير صالحة' });
    }
    
    const tokens = generateTokens(user);
    res.json({ success: true, ...tokens });
  } catch (error) {
    res.status(401).json({ error: 'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجدداً' });
  }
});

module.exports = router;
