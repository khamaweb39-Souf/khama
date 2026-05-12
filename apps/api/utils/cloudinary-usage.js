const cloudinary = require('../config/cloudinary');

/**
 * فحص استهلاك الرصيد في Cloudinary
 */
async function checkUsage() {
  try {
    const usage = await cloudinary.api.usage();
    
    return {
      credits: {
        used_percent: usage.credits.used_percent,
        remaining: 100 - usage.credits.used_percent
      },
      storage: {
        used: usage.storage.used,
        limit: usage.storage.limit,
        used_percent: (usage.storage.used / usage.storage.limit) * 100
      },
      bandwidth: {
        used: usage.bandwidth.used,
        limit: usage.bandwidth.limit,
        used_percent: (usage.bandwidth.used / usage.bandwidth.limit) * 100
      }
    };
  } catch (error) {
    console.error('Cloudinary usage check failed:', error);
    return null;
  }
}

/**
 * طباعة تحذير في حال انخفاض الرصيد
 */
async function warnIfLow() {
  const usage = await checkUsage();
  if (usage && usage.credits.remaining < 20) {
    console.warn(`⚠️ Cloudinary credits low: ${usage.credits.remaining}% remaining!`);
  }
}

module.exports = { checkUsage, warnIfLow };
