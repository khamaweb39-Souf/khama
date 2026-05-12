const https = require('https');

const PING_INTERVAL = 14 * 60 * 1000; // كل 14 دقيقة لضمان عدم نوم السيرفر
const URLS = [
  'https://khama-api.onrender.com/api/v1/health',
  'https://khama-frontend-v1.onrender.com'
];

function startKeepAlive() {
  // التفعيل فقط في بيئة الإنتاج
  if (process.env.NODE_ENV !== 'production') {
    console.log('⏭️ Keep-alive skipped (not in production)');
    return;
  }
  
  console.log('🏃 Keep-alive mechanism started');
  
  setInterval(() => {
    URLS.forEach(url => {
      https.get(url, (res) => {
        console.log(`✓ Pinged ${url}: Status ${res.statusCode}`);
      }).on('error', (err) => {
        console.error(`✗ Failed to ping ${url}:`, err.message);
      });
    });
  }, PING_INTERVAL);
}

module.exports = { startKeepAlive };
