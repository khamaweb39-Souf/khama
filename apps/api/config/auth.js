const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

function generateTokens(user) {
  const payload = {
    id: user.id,
    type: user.userType,
    verified: user.isVerified
  };
  
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY
  });
  
  // استخدام سر مختلف للـ Refresh Token لمزيد من الأمان
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET || (process.env.JWT_SECRET + '_refresh'),
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
  
  return { accessToken, refreshToken };
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateTokens, verifyAccessToken };
