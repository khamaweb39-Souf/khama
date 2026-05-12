const { prisma } = require('../lib/prisma');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('🌱 بدء عملية البذر...');

  // ─── الشارات ──────────────────────────────────────────
  const badges = await Promise.all([
    prisma.badge.upsert({
      where: { code: 'MADE_IN_ALGERIA' },
      update: {},
      create: {
        code: 'MADE_IN_ALGERIA',
        name: { ar: 'صنع في الجزائر', fr: 'Fabriqué en Algérie', en: 'Made in Algeria' },
        description: 'منتج جزائري 100%',
        icon: '🇩🇿',
        color: '#006233',
        type: 'MANUAL',
        isRevocable: false,
      },
    }),
    prisma.badge.upsert({
      where: { code: 'TOP_SELLER' },
      update: {},
      create: {
        code: 'TOP_SELLER',
        name: { ar: 'بائع مميز', fr: 'Meilleur vendeur', en: 'Top Seller' },
        description: 'تجاوز 100 طلب مكتمل',
        icon: '⭐',
        color: '#D4AF37',
        type: 'AUTOMATIC',
        criteria: { minOrders: 100 },
        isRevocable: true,
      },
    }),
    prisma.badge.upsert({
      where: { code: 'VERIFIED_STORE' },
      update: {},
      create: {
        code: 'VERIFIED_STORE',
        name: { ar: 'متجر موثوق', fr: 'Boutique vérifiée', en: 'Verified Store' },
        description: 'تم التحقق من وثائق المتجر',
        icon: '✅',
        color: '#2563EB',
        type: 'MANUAL',
        isRevocable: true,
      },
    }),
  ]);
  console.log(`✅ تم إنشاء ${badges.length} شارة`);

  // ─── التصنيفات (المستوى الأول) ────────────────────────
  const fabricCat = await prisma.category.upsert({
    where: { slug: 'tissus' },
    update: {},
    create: {
      slug: 'tissus',
      name: { ar: 'أقمشة', fr: 'Tissus', en: 'Fabrics' },
      icon: '🧵',
      level: 1,
      sortOrder: 1,
    },
  });

  const threadsCat = await prisma.category.upsert({
    where: { slug: 'fils' },
    update: {},
    create: {
      slug: 'fils',
      name: { ar: 'خيوط', fr: 'Fils', en: 'Threads' },
      icon: '🪡',
      level: 1,
      sortOrder: 2,
    },
  });

  const accessoriesCat = await prisma.category.upsert({
    where: { slug: 'accessoires' },
    update: {},
    create: {
      slug: 'accessoires',
      name: { ar: 'إكسسوارات', fr: 'Accessoires', en: 'Accessories' },
      icon: '🧷',
      level: 1,
      sortOrder: 3,
    },
  });
  console.log(`✅ تم إنشاء 3 تصنيفات رئيسية`);

  // ─── التصنيفات (المستوى الثاني) ──────────────────────
  const cottonCat = await prisma.category.upsert({
    where: { slug: 'tissus-coton' },
    update: {},
    create: {
      slug: 'tissus-coton',
      name: { ar: 'أقمشة قطنية', fr: 'Tissus coton', en: 'Cotton Fabrics' },
      level: 2,
      sortOrder: 1,
      parentId: fabricCat.id,
    },
  });

  const syntheticCat = await prisma.category.upsert({
    where: { slug: 'tissus-synthetiques' },
    update: {},
    create: {
      slug: 'tissus-synthetiques',
      name: { ar: 'أقمشة اصطناعية', fr: 'Tissus synthétiques', en: 'Synthetic Fabrics' },
      level: 2,
      sortOrder: 2,
      parentId: fabricCat.id,
    },
  });
  console.log(`✅ تم إنشاء التصنيفات الفرعية`);

  // ─── خصائص التصنيف ────────────────────────────────────
  await prisma.categoryAttribute.createMany({
    skipDuplicates: true,
    data: [
      {
        categoryId: fabricCat.id,
        name: { ar: 'الكثافة (GSM)', fr: 'Densité (GSM)', en: 'Density (GSM)' },
        type: 'range',
        unit: 'gsm',
        isFilterable: true,
        isRequired: true,
      },
      {
        categoryId: fabricCat.id,
        name: { ar: 'اللون', fr: 'Couleur', en: 'Color' },
        type: 'color',
        isFilterable: true,
        isRequired: false,
      },
      {
        categoryId: fabricCat.id,
        name: { ar: 'العرض', fr: 'Largeur', en: 'Width' },
        type: 'select',
        unit: 'cm',
        options: ['90', '110', '140', '150', '160', '180', '200'],
        isFilterable: true,
        isRequired: false,
      },
    ],
  });
  console.log(`✅ تم إنشاء خصائص التصنيفات`);

  // ─── مستخدم تجريبي (بائع) ─────────────────────────────
  const hashedPassword = await bcrypt.hash('password123', 10);

  const seller = await prisma.user.upsert({
    where: { phone: '0550000001' },
    update: {},
    create: {
      phone: '0550000001',
      email: 'seller@khama.dz',
      password: hashedPassword,
      fullName: 'متجر خامة التجريبي',
      userType: 'SELLER',
      wilaya: 'الجزائر',
      isVerified: true,
      wallet: {
        create: {
          balance: 0,
          pendingBalance: 0,
          totalEarnings: 0,
        },
      },
    },
  });

  // ─── متجر تجريبي ──────────────────────────────────────
  const store = await prisma.store.upsert({
    where: { slug: 'khama-demo' },
    update: {},
    create: {
      userId: seller.id,
      name: 'خامة - متجر الأقمشة',
      slug: 'khama-demo',
      description: 'أفضل أقمشة جزائرية بأسعار الجملة',
      specialization: ['أقمشة', 'خيوط'],
      isVerified: true,
      rating: 4.8,
      reviewCount: 0,
    },
  });

  // ─── منتج تجريبي ──────────────────────────────────────
  await prisma.product.upsert({
    where: { storeId_sku: { storeId: store.id, sku: 'FAB-COT-001' } },
    update: {},
    create: {
      storeId: store.id,
      categoryId: cottonCat.id,
      sku: 'FAB-COT-001',
      title: { ar: 'قماش قطن 100% - أبيض', fr: 'Tissu coton 100% - Blanc', en: 'Cotton Fabric 100% - White' },
      description: 'قماش قطني عالي الجودة مناسب للملابس الداخلية والقمصان',
      images: [],
      pricingType: 'TIERED',
      tieredPricing: [
        { min: 1, max: 9, price: 350 },
        { min: 10, max: 49, price: 320 },
        { min: 50, max: null, price: 290 },
      ],
      stock: 5000,
      lowStockThreshold: 100,
      attributes: { gsm: 180, width: 150, composition: '100% Cotton' },
      badges: ['MADE_IN_ALGERIA'],
      status: 'ACTIVE',
    },
  });

  // ─── مستخدم تجريبي (مشتري) ────────────────────────────
  await prisma.user.upsert({
    where: { phone: '0660000001' },
    update: {},
    create: {
      phone: '0660000001',
      email: 'buyer@khama.dz',
      password: hashedPassword,
      fullName: 'أحمد بن عيسى',
      userType: 'CONSUMER',
      wilaya: 'وهران',
      isVerified: true,
      wallet: { create: { balance: 0, pendingBalance: 0, totalEarnings: 0 } },
    },
  });

  console.log(`✅ تم إنشاء المستخدمين والمتاجر والمنتجات التجريبية`);
  console.log('🎉 اكتملت عملية البذر بنجاح!');
}

main()
  .catch((e) => {
    console.error('❌ خطأ في البذر:', e);
    process.exit(1);
  })
  .finally(async () => {
    const { prisma } = require('../lib/prisma');
    await prisma.$disconnect();
  });
