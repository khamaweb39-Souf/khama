/**
 * نظام التحقق المؤقت (OTP) - نسخة اقتصادية
 * للإنتاج: يفضل استخدام Redis لتخزين الرموز
 */

const otpStore = new Map(); 

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTP(phone, otp) {
  // للتطوير: طباعة الرمز في الـ console
  // للإنتاج: يمكن ربطه بـ WhatsApp Cloud API (مجاني لأول 1000 محادثة)
  console.log(`\n📱 [OTP] الرمز الخاص بـ ${phone} هو: ${otp} (صالح لـ 5 دقائق)\n`);
  
  otpStore.set(phone, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
    attempts: 0
  });
  
  return true;
}

function verifyOTP(phone, inputOtp) {
  const stored = otpStore.get(phone);
  
  if (!stored) return { valid: false, error: 'رمز غير موجود أو انتهت صلاحيته' };
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(phone);
    return { valid: false, error: 'انتهت صلاحية الرمز' };
  }
  if (stored.attempts >= 3) {
    otpStore.delete(phone);
    return { valid: false, error: 'محاولات كثيرة خاطئة، اطلب رمزاً جديداً' };
  }
  
  if (stored.otp === inputOtp) {
    otpStore.delete(phone);
    return { valid: true };
  }
  
  stored.attempts++;
  return { valid: false, error: 'رمز التحقق غير صحيح' };
}

module.exports = { generateOTP, sendOTP, verifyOTP };
