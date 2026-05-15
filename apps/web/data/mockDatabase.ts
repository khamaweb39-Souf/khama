export const MOCK_PRODUCTS = [
  // --- HIGH-FIDELITY TECHNICAL TEXTILES (15+ Items) ---
  {
    id: 'f1',
    name: 'جاكارد ملكي - نقشة الزمرد',
    reference: 'DZ-JAC-ROYAL-001',
    category: 'fabrics',
    subcategory: 'jacquard',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
    collection: 'HERITAGE 2026',
    certifications: ['GOTS', 'OEKO-TEX Standard 100'],
    sustainabilityScore: 5,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's1', name: 'نسيج ليون - الجزائر', isVerified: true, avatar: '🏢' },
    origin: { country: 'الجزائر', flag: '🇩🇿' },
    composition: [
      { fiber: 'حرير طبيعي', percentage: 60, color: '#004B49' },
      { fiber: 'خيوط ذهبية', percentage: 40, color: '#C9A84C' }
    ],
    technicalSpecs: { 
      gsm: 280, 
      width: 140, 
      rollLength: 50,
      weave: 'Jacquard Complex', 
      colorsAvailable: ['#004B49', '#5C0029', '#0D0C0A'], 
      totalColors: 12 
    },
    commercial: { price: 6500, currency: 'DZD', unit: 'm', moq: 10, stockStatus: 'IN_STOCK', leadTimeWeeks: 1 }
  },
  {
    id: 'f2',
    name: 'نسيج صناعي مقاوم للحرارة (خالٍ من الأسبستوس)',
    reference: 'IND-FIRE-ARAM-04',
    category: 'fabrics',
    subcategory: 'industrial',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
    collection: 'SAFE-TECH',
    certifications: ['ISO 9001', 'UL Certified', 'ASTM'],
    sustainabilityScore: 4,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's8', name: 'تجهيزات الشرق للنسيج', isVerified: true, avatar: '🏗️' },
    origin: { country: 'ألمانيا', flag: '🇩🇪' },
    composition: [
      { fiber: 'أراميد (Aramid)', percentage: 100, color: '#D4AF37' }
    ],
    technicalSpecs: { 
      gsm: 450, 
      width: 150, 
      rollLength: 100,
      weave: 'Twill 2/2', 
      colorsAvailable: ['#D4AF37'], 
      totalColors: 1 
    },
    commercial: { price: 12000, currency: 'DZD', unit: 'm', moq: 50, stockStatus: 'ON_ORDER', leadTimeWeeks: 3 }
  },
  {
    id: 'f3',
    name: 'مزيج القطن العضوي والخيزران (Bamboo)',
    reference: 'DZ-ECO-SOFT-12',
    category: 'fabrics',
    subcategory: 'organic',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    collection: 'GREEN-FLOW',
    certifications: ['GOTS', 'PETA-Approved Vegan'],
    sustainabilityScore: 5,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's2', name: 'بيوتيك الجزائر (BioTex)', isVerified: true, avatar: '🌿' },
    origin: { country: 'الجزائر', flag: '🇩🇿' },
    composition: [
      { fiber: 'قطن عضوي', percentage: 70, color: '#F5F5F5' },
      { fiber: 'ألياف الخيزران', percentage: 30, color: '#F5F5F5' }
    ],
    technicalSpecs: { 
      gsm: 160, 
      width: 180, 
      rollLength: 60,
      weave: 'Single Jersey', 
      colorsAvailable: ['#F5F5F5', '#E3DED1', '#4A7C59'], 
      totalColors: 24 
    },
    commercial: { price: 2200, currency: 'DZD', unit: 'm', moq: 100, stockStatus: 'IN_STOCK', leadTimeWeeks: 1 }
  },
  {
    id: 'f4',
    name: 'جوخ شتوي مبطن باللباد (Felt-lined)',
    reference: 'DZ-WINT-FELT-02',
    category: 'fabrics',
    subcategory: 'winter',
    image: 'https://images.unsplash.com/photo-1594932224011-042041c6ff9a?q=80&w=800&auto=format&fit=crop',
    collection: 'ALPINE 2026',
    certifications: ['ISO 14001'],
    sustainabilityScore: 3,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's4', name: 'أصواف الأطلس', isVerified: true, avatar: '🐑' },
    origin: { country: 'المغرب', flag: '🇲🇦' },
    composition: [
      { fiber: 'صوف بكر', percentage: 80, color: '#2C3E50' },
      { fiber: 'بوليستر معاد تدويره', percentage: 20, color: '#2C3E50' }
    ],
    technicalSpecs: { 
      gsm: 520, 
      width: 145, 
      rollLength: 30,
      weave: 'Double Face / Felt', 
      colorsAvailable: ['#2C3E50', '#5C0029', '#0D0C0A'], 
      totalColors: 8 
    },
    commercial: { price: 4800, currency: 'DZD', unit: 'm', moq: 20, stockStatus: 'IN_STOCK', leadTimeWeeks: 2 }
  },
  {
    id: 'f5',
    name: 'دينيم ياباني خام (Raw Selvedge Denim)',
    reference: 'JPN-DENIM-14OZ',
    category: 'fabrics',
    subcategory: 'denim',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    collection: 'DENIM-HEAD',
    certifications: ['BCI Cotton'],
    sustainabilityScore: 4,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's9', name: 'المتحدة للنسيج', isVerified: true, avatar: '👖' },
    origin: { country: 'اليابان', flag: '🇯🇵' },
    composition: [
      { fiber: 'قطن طويل التيلة', percentage: 100, color: '#002366' }
    ],
    technicalSpecs: { 
      gsm: 410, 
      width: 80, 
      rollLength: 45,
      weave: '3/1 Right Hand Twill', 
      colorsAvailable: ['#002366'], 
      totalColors: 1 
    },
    commercial: { price: 3500, currency: 'DZD', unit: 'm', moq: 100, stockStatus: 'PRE_ORDER', leadTimeWeeks: 6 }
  },
  {
    id: 'f6',
    name: 'مخمل مطرز - فاخر',
    reference: 'DZ-VELVET-EMB-08',
    category: 'fabrics',
    subcategory: 'velvet',
    image: 'https://images.unsplash.com/photo-1523450001312-faa4e2e31f0f?q=80&w=800&auto=format&fit=crop',
    collection: 'GALA 2026',
    certifications: ['OEKO-TEX'],
    sustainabilityScore: 3,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's1', name: 'نسيج ليون - الجزائر', isVerified: true, avatar: '🏢' },
    origin: { country: 'الجزائر', flag: '🇩🇿' },
    composition: [
      { fiber: 'بوليستر بريميوم', percentage: 90, color: '#800020' },
      { fiber: 'إيلاستين', percentage: 10, color: '#800020' }
    ],
    technicalSpecs: { 
      gsm: 380, 
      width: 150, 
      rollLength: 40,
      weave: 'Pile Weave / Velvet', 
      colorsAvailable: ['#800020', '#1A1A1A', '#4A0E0E'], 
      totalColors: 15 
    },
    commercial: { price: 5500, currency: 'DZD', unit: 'm', moq: 15, stockStatus: 'IN_STOCK', leadTimeWeeks: 1 }
  },
  {
    id: 'f7',
    name: 'قماش كانفاس عسكري متين',
    reference: 'IND-CANVAS-MIL-01',
    category: 'fabrics',
    subcategory: 'industrial',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    collection: 'TACTICAL',
    certifications: ['ISO 9001', 'Military Grade'],
    sustainabilityScore: 4,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's8', name: 'تجهيزات الشرق للنسيج', isVerified: true, avatar: '🏗️' },
    origin: { country: 'الجزائر', flag: '🇩🇿' },
    composition: [
      { fiber: 'قطن ثقيل', percentage: 60, color: '#4B5320' },
      { fiber: 'بوليستر عالي الشد', percentage: 40, color: '#4B5320' }
    ],
    technicalSpecs: { 
      gsm: 600, 
      width: 160, 
      rollLength: 50,
      weave: 'Duck Weave', 
      colorsAvailable: ['#4B5320', '#708090'], 
      totalColors: 4 
    },
    commercial: { price: 2800, currency: 'DZD', unit: 'm', moq: 200, stockStatus: 'IN_STOCK', leadTimeWeeks: 2 }
  },
  {
    id: 'f8',
    name: 'جيرسي بوليستر معاد تدويره',
    reference: 'DZ-RE-POLY-JRS',
    category: 'fabrics',
    subcategory: 'sport',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800&auto=format&fit=crop',
    collection: 'ACTIVE-ECO',
    certifications: ['GRS (Global Recycled Standard)', 'OEKO-TEX'],
    sustainabilityScore: 5,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's2', name: 'بيوتيك الجزائر (BioTex)', isVerified: true, avatar: '🌿' },
    origin: { country: 'الجزائر', flag: '🇩🇿' },
    composition: [
      { fiber: 'بوليستر تدوير', percentage: 100, color: '#007FFF' }
    ],
    technicalSpecs: { 
      gsm: 180, 
      width: 170, 
      rollLength: 80,
      weave: 'Circular Knit', 
      colorsAvailable: ['#007FFF', '#FF4500', '#32CD32'], 
      totalColors: 32 
    },
    commercial: { price: 1450, currency: 'DZD', unit: 'm', moq: 300, stockStatus: 'IN_STOCK', leadTimeWeeks: 2 }
  },
  {
    id: 'f9',
    name: 'توييد صوف جزائري - نمط كلاسيكي',
    reference: 'DZ-WOOL-TWEED-05',
    category: 'fabrics',
    subcategory: 'wool',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    collection: 'SAVILE-DZ',
    certifications: ['Handwoven Algerian'],
    sustainabilityScore: 5,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's4', name: 'أصواف الأطلس', isVerified: true, avatar: '🐑' },
    origin: { country: 'الجزائر', flag: '🇩🇿' },
    composition: [
      { fiber: 'صوف غنم محلي', percentage: 100, color: '#8B4513' }
    ],
    technicalSpecs: { 
      gsm: 380, 
      width: 150, 
      rollLength: 25,
      weave: 'Tweed Weave', 
      colorsAvailable: ['#8B4513', '#A0522D', '#D2B48C'], 
      totalColors: 10 
    },
    commercial: { price: 5200, currency: 'DZD', unit: 'm', moq: 5, stockStatus: 'ON_ORDER', leadTimeWeeks: 4 }
  },
  {
    id: 'f10',
    name: 'قماش كوردروي ثقيل (Corduroy 8-Wale)',
    reference: 'DZ-CORD-HEAVY-01',
    category: 'fabrics',
    subcategory: 'winter',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    collection: 'VINTAGE-VIBE',
    certifications: ['BCI Cotton'],
    sustainabilityScore: 4,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's1', name: 'نسيج ليون - الجزائر', isVerified: true, avatar: '🏢' },
    origin: { country: 'الجزائر', flag: '🇩🇿' },
    composition: [
      { fiber: 'قطن', percentage: 98, color: '#3D2B1F' },
      { fiber: 'ليكرا', percentage: 2, color: '#3D2B1F' }
    ],
    technicalSpecs: { 
      gsm: 320, 
      width: 155, 
      rollLength: 40,
      weave: 'Warp Pile Corduroy', 
      colorsAvailable: ['#3D2B1F', '#DAA520', '#000000'], 
      totalColors: 12 
    },
    commercial: { price: 2600, currency: 'DZD', unit: 'm', moq: 30, stockStatus: 'IN_STOCK', leadTimeWeeks: 1 }
  },
  {
    id: 'f11',
    name: 'حرير شيفون بريميوم - شفاف',
    reference: 'DZ-SILK-CHIF-03',
    category: 'fabrics',
    subcategory: 'silk',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop',
    collection: 'ETHEREAL',
    certifications: ['OEKO-TEX'],
    sustainabilityScore: 4,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's2', name: 'حرير الأطلس', isVerified: true, avatar: '🦋' },
    origin: { country: 'الجزائر', flag: '🇩🇿' },
    composition: [
      { fiber: 'حرير دودة القز', percentage: 100, color: '#FFB6C1' }
    ],
    technicalSpecs: { 
      gsm: 45, 
      width: 140, 
      rollLength: 60,
      weave: 'Plain Sheer Weave', 
      colorsAvailable: ['#FFB6C1', '#F0F8FF', '#FFFFFF'], 
      totalColors: 40 
    },
    commercial: { price: 4200, currency: 'DZD', unit: 'm', moq: 10, stockStatus: 'IN_STOCK', leadTimeWeeks: 1 }
  },
  {
    id: 'f12',
    name: 'غابردين مقاوم للماء - تقني',
    reference: 'DZ-GAB-TECH-WP',
    category: 'fabrics',
    subcategory: 'technical',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    collection: 'STORM-PROOF',
    certifications: ['REACH Compliance'],
    sustainabilityScore: 3,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's9', name: 'المتحدة للنسيج', isVerified: true, avatar: '🧥' },
    origin: { country: 'الجزائر', flag: '🇩🇿' },
    composition: [
      { fiber: 'قطن', percentage: 65, color: '#F5F5DC' },
      { fiber: 'بوليستر', percentage: 35, color: '#F5F5DC' }
    ],
    technicalSpecs: { 
      gsm: 240, 
      width: 155, 
      rollLength: 55,
      weave: 'Twill 2/1', 
      colorsAvailable: ['#F5F5DC', '#2F4F4F', '#000000'], 
      totalColors: 6 
    },
    commercial: { price: 1950, currency: 'DZD', unit: 'm', moq: 50, stockStatus: 'IN_STOCK', leadTimeWeeks: 2 }
  },
  {
    id: 'f13',
    name: 'بوبلين قطني - سهل الكي',
    reference: 'DZ-POP-EZIRON',
    category: 'fabrics',
    subcategory: 'cotton',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
    collection: 'OFFICE-PRO',
    certifications: ['BCI Cotton'],
    sustainabilityScore: 4,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's2', name: 'بيوتيك الجزائر (BioTex)', isVerified: true, avatar: '🌿' },
    origin: { country: 'الجزائر', flag: '🇩🇿' },
    composition: [
      { fiber: 'قطن مصري طويل التيلة', percentage: 100, color: '#ADD8E6' }
    ],
    technicalSpecs: { 
      gsm: 110, 
      width: 150, 
      rollLength: 70,
      weave: 'Fine Plain Weave', 
      colorsAvailable: ['#ADD8E6', '#FFFFFF', '#FFDAB9'], 
      totalColors: 18 
    },
    commercial: { price: 1150, currency: 'DZD', unit: 'm', moq: 100, stockStatus: 'IN_STOCK', leadTimeWeeks: 1 }
  },
  {
    id: 'f14',
    name: 'قماش غير منسوج طبي (Spunbond PP)',
    reference: 'MED-NONWOV-01',
    category: 'fabrics',
    subcategory: 'medical',
    image: 'https://images.unsplash.com/photo-1582142306909-195724d339aa?q=80&w=800&auto=format&fit=crop',
    collection: 'HEALTH-SAFE',
    certifications: ['CE Medical Grade', 'ISO 13485'],
    sustainabilityScore: 3,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's8', name: 'تجهيزات الشرق للنسيج', isVerified: true, avatar: '🏗️' },
    origin: { country: 'الجزائر', flag: '🇩🇿' },
    composition: [
      { fiber: 'بولي بروبلين', percentage: 100, color: '#00BFFF' }
    ],
    technicalSpecs: { 
      gsm: 40, 
      width: 160, 
      rollLength: 500,
      weave: 'Spunbond Non-woven', 
      colorsAvailable: ['#00BFFF', '#FFFFFF'], 
      totalColors: 2 
    },
    commercial: { price: 85, currency: 'DZD', unit: 'm', moq: 2000, stockStatus: 'IN_STOCK', leadTimeWeeks: 1 }
  },
  {
    id: 'f15',
    name: 'جلد سويد نباتي (Eco-Suede)',
    reference: 'VEG-SUEDE-ECO',
    category: 'leather',
    subcategory: 'vegan',
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=800&auto=format&fit=crop',
    collection: 'ANIMAL-FREE',
    certifications: ['PETA-Approved Vegan', 'GRS'],
    sustainabilityScore: 5,
    createdAt: '2024-01-01T00:00:00Z',
    supplier: { id: 's7', name: 'جرين ليدر المغرب', isVerified: true, avatar: '🌱' },
    origin: { country: 'المغرب', flag: '🇲🇦' },
    composition: [
      { fiber: 'بوليستر تدوير', percentage: 60, color: '#CD853F' },
      { fiber: 'بولي يوريثين حيوي', percentage: 40, color: '#CD853F' }
    ],
    technicalSpecs: { 
      thickness: '0.8mm', 
      width: 140, 
      rollLength: 30,
      finish: 'Suede Matte', 
      colorsAvailable: ['#CD853F', '#8B4513', '#000000'], 
      totalColors: 8 
    },
    commercial: { price: 3200, currency: 'DZD', unit: 'm', moq: 50, stockStatus: 'IN_STOCK', leadTimeWeeks: 2 }
  }
];

export const MOCK_RFQS = [
  {
    id: 'rfq1',
    title: 'مطلوب 5000 متر بوبلين أبيض لقمصان رجالي',
    buyer: 'شركة الأناقة للخياطة',
    date: 'منذ ساعتين',
    quantity: '5000 متر',
    budget: '$15,000 - $20,000',
    status: 'ACTIVE',
    offers: 12,
    category: 'fabrics'
  },
  {
    id: 'rfq2',
    title: 'توريد جلد ماعز مدبوغ للحقائب اليدوية',
    buyer: 'ورشة إبداع للجلود',
    date: 'منذ 5 ساعات',
    quantity: '2000 قدم مربع',
    budget: '$5,000 - $7,000',
    status: 'ACTIVE',
    offers: 5,
    category: 'leather'
  },
  {
    id: 'rfq3',
    title: 'آلة قص أوتوماتيكية للإنتاج الكمي',
    buyer: 'مصنع الأمل للملابس الجاهزة',
    date: 'منذ يوم واحد',
    quantity: 'قطعة واحدة',
    budget: '$8,000 - $10,000',
    status: 'PENDING',
    offers: 3,
    category: 'machinery'
  },
  {
    id: 'rfq4',
    title: 'قماش جينز (Denim) 12 أوز ثقيل',
    buyer: 'كازابلانكا فاشن',
    date: 'منذ يومين',
    quantity: '10,000 متر',
    budget: '$30,000',
    status: 'ACTIVE',
    offers: 25,
    category: 'fabrics'
  }
];
