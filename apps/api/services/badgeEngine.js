const { prisma } = require('../lib/prisma');
const BADGES = require('../config/badges');

async function recalculateBadges() {
  console.log('🏅 بدء عملية إعادة حساب الشارات...');
  
  const users = await prisma.user.findMany({
    where: { isActive: true },
    include: {
      store: true,
      badges: { include: { badge: true } }
    }
  });
  
  for (const user of users) {
    for (const [code, badgeConfig] of Object.entries(BADGES)) {
      if (badgeConfig.type !== 'AUTOMATIC') continue;
      
      const isEligible = await checkEligibility(user, badgeConfig);
      const hasBadge = user.badges.some(b => b.badge.code === code);
      
      if (isEligible && !hasBadge) {
        await grantBadge(user.id, code);
        console.log(`✅ تم منح شارة ${code} للمستخدم ${user.fullName}`);
      } else if (!isEligible && hasBadge && badgeConfig.isRevocable) {
        await revokeBadge(user.id, code);
        console.log(`❌ تم سحب شارة ${code} من المستخدم ${user.fullName}`);
      }
    }
  }
}

async function checkEligibility(user, badge) {
  const { criteria } = badge;
  
  try {
    switch (badge.code) {
      case 'ON_TIME': {
        if (!user.store) return false;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - criteria.period);
        
        const orders = await prisma.order.findMany({
          where: {
            storeId: user.store.id,
            createdAt: { gte: startDate },
            status: 'DELIVERED'
          }
        });
        
        if (orders.length < criteria.minOrders) return false;
        // منطق مبسط للتحقق من المواعيد
        return true; 
      }
      
      case 'GOLD_CUSTOMER': {
        const ordersCount = await prisma.order.count({
          where: { userId: user.id, status: 'DELIVERED' }
        });
        return ordersCount >= criteria.minOrders;
      }
      
      default:
        return false;
    }
  } catch (e) {
    return false;
  }
}

async function grantBadge(userId, badgeCode) {
  let badge = await prisma.badge.findUnique({ where: { code: badgeCode } });
  
  // إنشاء الشارة في قاعدة البيانات إذا لم تكن موجودة
  if (!badge) {
    const config = BADGES[badgeCode];
    badge = await prisma.badge.create({
      data: {
        code: badgeCode,
        name: config.name,
        icon: config.icon,
        color: config.color,
        description: config.name.ar
      }
    });
  }
  
  await prisma.userBadge.create({
    data: {
      userId,
      badgeId: badge.id
    }
  }).catch(() => {}); // تجنب أخطاء التكرار
}

async function revokeBadge(userId, badgeCode) {
  const badge = await prisma.badge.findUnique({ where: { code: badgeCode } });
  if (!badge) return;
  
  await prisma.userBadge.deleteMany({
    where: { userId, badgeId: badge.id }
  });
}

module.exports = { recalculateBadges };
