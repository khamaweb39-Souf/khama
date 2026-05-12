const { verifyAccessToken } = require('../config/auth');
const { prisma } = require('../lib/prisma');

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'يرجى تسجيل الدخول أولاً' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = verifyAccessToken(token);
    
    // التحقق من أن المستخدم لا يزال موجوداً ونشطاً
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, isActive: true, userType: true }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'الحساب غير موجود أو غير نشط' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'TOKEN_EXPIRED', message: 'انتهت صلاحية الجلسة' });
    }
    res.status(401).json({ error: 'رمز غير صالح' });
  }
}

function authorize(...allowedTypes) {
  return (req, res, next) => {
    if (!allowedTypes.includes(req.user.type)) {
      return res.status(403).json({ error: 'ليس لديك صلاحية للقيام بهذا الإجراء' });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
