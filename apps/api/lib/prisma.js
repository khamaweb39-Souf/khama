const { PrismaClient } = require('@prisma/client');

// Singleton pattern لمنع استنزاف الاتصالات في Render Free Tier
const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        // connection_limit=5 : يقلل من الاتصالات المتزامنة (Free Tier = 97 max)
        // pool_timeout=10    : ينتظر 10 ثواني قبل إلغاء الطلب
        // pgbouncer=true     : يتوافق مع PgBouncer إذا أُضيف لاحقاً
        url: process.env.DATABASE_URL + (process.env.DATABASE_URL?.includes('?') ? '&' : '?') + 'connection_limit=5&pool_timeout=10',
      },
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// معالج إغلاق نظيف لتحرير الاتصالات عند إيقاف السيرفر
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = { prisma };
