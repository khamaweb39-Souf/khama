export interface GlossaryEntry {
  id: string;
  termFr: string;
  termEn: string;
  termAr: string;
  category: 'Fibres' | 'Armures' | 'Finitions' | 'Commerce' | 'Certifications' | 'Machines';
  definition: {
    fr: string;
    ar: string;
  };
  details?: string;
  example?: string;
  relatedIds?: string[];
  linkToCatalog?: string;
}

export const GLOSSARY_DATA: GlossaryEntry[] = [
  {
    id: 'armure',
    termFr: 'Armure',
    termEn: 'Weave',
    termAr: 'التراكيب النسجية',
    category: 'Armures',
    definition: {
      fr: 'Mode d\'entrecroisement des fils de chaîne et des fils de trame d\'un tissu. Il existe trois armures de base : la toile, le sergé et le satin.',
      ar: 'طريقة تقاطع خيوط السداء مع خيوط اللحمة في القماش. هناك ثلاث تراكيب أساسية: السادة، المبرد، والأطلس.'
    },
    example: 'L\'armure toile est la plus simple et la plus solide.',
    relatedIds: ['serge', 'satin', 'taffetas']
  },
  {
    id: 'contexture',
    termFr: 'Contexture',
    termEn: 'Thread Count',
    termAr: 'الكثافة النسجية',
    category: 'Armures',
    definition: {
      fr: 'Nombre de fils de chaîne et de fils de trame par unité de surface (généralement en fils/cm). Elle détermine la finesse et la solidité du tissu.',
      ar: 'عدد خيوط السداء واللحمة في وحدة المساحة (غالباً بالخيط/سم). تحدد مدى نعومة ومتانة القماش.'
    },
    relatedIds: ['gsm']
  },
  {
    id: 'gsm',
    termFr: 'GSM (Grammage)',
    termEn: 'GSM (Grams per Square Meter)',
    termAr: 'وزن المتر المربع',
    category: 'Commerce',
    definition: {
      fr: 'Poids du tissu exprimé en grammes par mètre carré. C\'est l\'unité standard pour comparer la densité des tissus.',
      ar: 'وزن القماش معبراً عنه بالجرام لكل متر مربع. هي الوحدة القياسية لمقارنة كثافة الأقمشة.'
    },
    relatedIds: ['contexture']
  },
  {
    id: 'laize',
    termFr: 'Laize',
    termEn: 'Width / Bolt Width',
    termAr: 'عرض القماش (اللايزة)',
    category: 'Commerce',
    definition: {
      fr: 'Largeur du tissu mesurée d\'une lisière à l\'autre. On distingue la laize totale de la laize utile (sans les bords).',
      ar: 'عرض القماش مقاساً من الحافة إلى الحافة. نميز بين العرض الإجمالي والعرض المفيد (بدون الحواف).'
    }
  },
  {
    id: 'jacquard',
    termFr: 'Jacquard',
    termEn: 'Jacquard',
    termAr: 'جاكارد',
    category: 'Machines',
    definition: {
      fr: 'Type de tissu dont les motifs sont tissés par soulèvement individuel de chaque fil de chaîne, permettant des dessins complexes et réversibles.',
      ar: 'نوع من القماش تُنسج زخارفه عن طريق رفع كل خيط سداء على حدة، مما يسمح برسومات معقدة وقابلة للانعكاس.'
    },
    linkToCatalog: '/cat/jacquard'
  },
  {
    id: 'serge',
    termFr: 'Sergé',
    termEn: 'Twill',
    termAr: 'مبرد / سرجيه',
    category: 'Armures',
    definition: {
      fr: 'Armure caractérisée par des lignes diagonales (côtes). C\'est l\'armure typique du Denim et de la Gabardine.',
      ar: 'تركيب نسجي يتميز بخطوط مائلة. هو التركيب التقليدي للدينيم (الجينز) والجابردين.'
    },
    relatedIds: ['armure', 'denim']
  },
  {
    id: 'satin',
    termFr: 'Satin',
    termEn: 'Satin',
    termAr: 'ساتان / أطلس',
    category: 'Armures',
    definition: {
      fr: 'Armure avec des points de liage espacés, créant une surface lisse, brillante sur l\'endroit et mate sur l\'envers.',
      ar: 'تركيب نسجي بنقاط ربط متباعدة، مما يخلق سطحاً ناعماً ولامعاً من الوجه ومطفأ من الظهر.'
    }
  },
  {
    id: 'taffetas',
    termFr: 'Taffetas',
    termEn: 'Taffeta',
    termAr: 'تافتا',
    category: 'Armures',
    definition: {
      fr: 'Tissu à armure toile, serré et lisse, produisant un craquement caractéristique au froissement.',
      ar: 'قماش بتركيب سادة، ضيق وناعم، يصدر صوتاً مميزاً (خشخشة) عند طيّه.'
    }
  },
  {
    id: 'velours',
    termFr: 'Velours',
    termEn: 'Velvet',
    termAr: 'مخمل / قطيفة',
    category: 'Finitions',
    definition: {
      fr: 'Tissu dont la surface est couverte de poils dressés, coupés ou bouclés, offrant un toucher doux et profond.',
      ar: 'قماش يغطى سطحه بشعيرات قائمة، مقصوصة أو ملتوية، مما يوفر ملمساً ناعماً وعميقاً.'
    }
  },
  {
    id: 'viscose',
    termFr: 'Viscose',
    termEn: 'Viscose / Rayon',
    termAr: 'فيسكوز / حرير صناعي',
    category: 'Fibres',
    definition: {
      fr: 'Fibre artificielle produite à partir de cellulose de bois. Elle imite la soie par son lustre et son tomber.',
      ar: 'ألياف اصطناعية منتجة من سلولوز الخشب. تشبه الحرير في لمعانها وانسيابيتها.'
    }
  },
  {
    id: 'lyocell',
    termFr: 'Lyocell (Tencel)',
    termEn: 'Lyocell',
    termAr: 'ليوسيل',
    category: 'Fibres',
    definition: {
      fr: 'Fibre cellulosique produite de manière écologique via un solvant non toxique recyclé à 99%.',
      ar: 'ألياف سلولوزية تُنتج بطريقة صديقة للبيئة عبر مذيب غير سام يُعاد تدويره بنسبة 99%.'
    }
  },
  {
    id: 'gots',
    termFr: 'GOTS',
    termEn: 'Global Organic Textile Standard',
    termAr: 'المعيار العالمي للمنسوجات العضوية',
    category: 'Certifications',
    definition: {
      fr: 'Certification mondiale garantissant le caractère biologique des textiles, depuis la récolte des matières premières jusqu\'à l\'étiquetage.',
      ar: 'شهادة عالمية تضمن الطابع العضوي للمنسوجات، من حصاد المواد الخام حتى وضع الملصقات.'
    }
  },
  {
    id: 'oeko-tex',
    termFr: 'OEKO-TEX Standard 100',
    termEn: 'OEKO-TEX Standard 100',
    termAr: 'أويكو-تيكس 100',
    category: 'Certifications',
    definition: {
      fr: 'Label garantissant que le textile a été testé pour les substances nocives et qu\'il est sans danger pour la santé humaine.',
      ar: 'ملصق يضمن أن المنسوجات قد تم اختبارها بحثاً عن المواد الضارة وأنها آمنة على صحة الإنسان.'
    }
  },
  {
    id: 'moq',
    termFr: 'MOQ',
    termEn: 'Minimum Order Quantity',
    termAr: 'الحد الأدنى لكمية الطلب',
    category: 'Commerce',
    definition: {
      fr: 'Quantité minimale imposée par un fournisseur pour accepter une commande.',
      ar: 'أقل كمية يفرضها المورد لقبول الطلبية.'
    }
  },
  {
    id: 'fob',
    termFr: 'FOB',
    termEn: 'Free On Board',
    termAr: 'فوب / التسليم على ظهر السفينة',
    category: 'Commerce',
    definition: {
      fr: 'Incoterm signifiant que le vendeur livre les marchandises à bord d\'un navire. L\'acheteur assume les frais et risques à partir de ce point.',
      ar: 'شرط تجاري يعني أن البائع يسلم البضائع على ظهر السفينة. ويتحمل المشتري التكاليف والمخاطر من هذه النقطة.'
    }
  },
  {
    id: 'retrecissement',
    termFr: 'Rétrécissement',
    termEn: 'Shrinkage',
    termAr: 'انكماش',
    category: 'Finitions',
    definition: {
      fr: 'Réduction dimensionnelle d\'un textile après lavage, séchage ou exposition à la chaleur.',
      ar: 'نقص في أبعاد النسيج بعد الغسيل أو التجفيف أو التعرض للحرارة.'
    }
  },
  {
    id: 'coton-peigne',
    termFr: 'Coton Peigné',
    termEn: 'Combed Cotton',
    termAr: 'قطن ممشط',
    category: 'Fibres',
    definition: {
      fr: 'Coton ayant subi une opération de peignage pour éliminer les fibres courtes et ne garder que les fibres longues et soyeuses.',
      ar: 'قطن خضع لعملية تمشيط لإزالة الألياف القصيرة والاحتفاظ فقط بالألياف الطويلة والحريرية.'
    }
  },
  {
    id: 'denim',
    termFr: 'Denim',
    termEn: 'Denim',
    termAr: 'دينيم / جينز',
    category: 'Armures',
    definition: {
      fr: 'Tissu de coton à armure sergé, caractérisé par un fil de chaîne teint en bleu (indigo) et un fil de trame écru ou blanc.',
      ar: 'قماش قطني بتركيب مبرد، يتميز بخيط سداء مصبوغ بالأزرق (إنديغو) وخيط لحمة أبيض أو خام.'
    }
  },
  {
    id: 'gabardine',
    termFr: 'Gabardine',
    termEn: 'Gabardine',
    termAr: 'جابردين',
    category: 'Armures',
    definition: {
      fr: 'Tissu très serré avec une armure sergé prononcée, résistant à l\'eau et à l\'usure, utilisé pour les manteaux.',
      ar: 'قماش متراكم جداً بتركيب مبرد واضح، مقاوم للماء والاهتراء، يستخدم للمعاطف.'
    }
  },
  {
    id: 'lin',
    termFr: 'Lin',
    termEn: 'Linen',
    termAr: 'كتان',
    category: 'Fibres',
    definition: {
      fr: 'Fibre naturelle issue de la plante de lin. Frais et absorbant, il est très apprécié pour l\'été.',
      ar: 'ألياف طبيعية مستخرجة من نبات الكتان. بارد وماص للرطوبة، محبوب جداً لفصل الصيف.'
    }
  },
  {
    id: 'modal',
    termFr: 'Modal',
    termEn: 'Modal',
    termAr: 'مودال',
    category: 'Fibres',
    definition: {
      fr: 'Variété de viscose très résistante et très douce, qui reste souple même après plusieurs lavages.',
      ar: 'نوع من الفيسكوز يتميز بمتانة ونعومة فائقة، ويظل مرناً حتى بعد غسلات متعددة.'
    }
  },
  {
    id: 'polyester',
    termFr: 'Polyester',
    termEn: 'Polyester',
    termAr: 'بوليستر',
    category: 'Fibres',
    definition: {
      fr: 'Fibre synthétique la plus utilisée au monde. Durable, infroissable et facile d\'entretien.',
      ar: 'أكثر الألياف الاصطناعية استخداماً في العالم. متينة، مقاومة للتجعد وسهلة العناية.'
    }
  },
  {
    id: 'soie',
    termFr: 'Soie',
    termEn: 'Silk',
    termAr: 'حرير',
    category: 'Fibres',
    definition: {
      fr: 'Fibre naturelle d\'origine animale issue du cocon du ver à soie. Symbole du luxe et de la finesse.',
      ar: 'ألياف طبيعية من أصل حيواني مستخرجة من شرنقة دودة القز. رمز للفخامة والنعومة.'
    }
  },
  {
    id: 'elasthanne',
    termFr: 'Élasthanne (Lycra)',
    termEn: 'Elastane / Spandex',
    termAr: 'إيلاستين / ليكرا',
    category: 'Fibres',
    definition: {
      fr: 'Fibre synthétique réputée pour sa grande élasticité (peut s\'étirer jusqu\'à 600% sans se rompre).',
      ar: 'ألياف اصطناعية مشهورة بمرونتها العالية (يمكن أن تمتد حتى 600% دون أن تنقطع).'
    }
  },
  {
    id: 'jersey',
    termFr: 'Jersey',
    termEn: 'Jersey',
    termAr: 'جيرسي',
    category: 'Armures',
    definition: {
      fr: 'Tissu de maille fine utilisé principalement pour les T-shirts. Il est naturellement extensible.',
      ar: 'قماش تريكو ناعم يستخدم بشكل أساسي للتيشرتات. يتميز بمرونة طبيعية.'
    }
  },
  {
    id: 'flanelle',
    termFr: 'Flanelle',
    termEn: 'Flannel',
    termAr: 'فلانيل',
    category: 'Finitions',
    definition: {
      fr: 'Tissu de laine ou coton à l\'aspect duveteux, obtenu par grattage de la surface.',
      ar: 'قماش من الصوف أو القطن ذو مظهر وبري، يتم الحصول عليه عن طريق حك (خربشة) السطح.'
    }
  },
  {
    id: 'mousseline',
    termFr: 'Mousseline',
    termEn: 'Chiffon / Muslin',
    termAr: 'موسلين / شيفون',
    category: 'Armures',
    definition: {
      fr: 'Tissu très léger, transparent et vaporeux, souvent utilisé pour les robes de soirée.',
      ar: 'قماش خفيف جداً، شفاف ورقيق، يستخدم غالباً لفساتين السهرة.'
    }
  },
  {
    id: 'pique',
    termFr: 'Piqué',
    termEn: 'Pique',
    termAr: 'بيكا / قطن محبب',
    category: 'Armures',
    definition: {
      fr: 'Tissu avec des motifs géométriques en relief (nid d\'abeille), typique des polos.',
      ar: 'قماش ذو زخارف هندسية بارزة (يشبه عش النحل)، وهو القماش التقليدي لقمصان البولو.'
    }
  },
  {
    id: 'interlock',
    termFr: 'Interlock',
    termEn: 'Interlock',
    termAr: 'إنترلوك / تريكو مزدوج',
    category: 'Armures',
    definition: {
      fr: 'Tricot double face, plus épais et plus stable que le jersey simple.',
      ar: 'تريكو مزدوج الوجه، أكثر سمكاً واستقراراً من الجيرسي العادي.'
    }
  },
  {
    id: 'popeline',
    termFr: 'Popeline',
    termEn: 'Poplin',
    termAr: 'بوبلين',
    category: 'Armures',
    definition: {
      fr: 'Tissu à armure toile caractérisé par des côtes transversales très fines, idéal pour les chemises.',
      ar: 'قماش بتركيب سادة يتميز بخطوط عرضية ناعمة جداً، مثالي للقمصان.'
    }
  },
  {
    id: 'canvas',
    termFr: 'Canvas (Bâche)',
    termEn: 'Canvas',
    termAr: 'كانفاس / قماش خشن',
    category: 'Armures',
    definition: {
      fr: 'Tissu extrêmement robuste et lourd à armure toile, utilisé pour les sacs et voiles.',
      ar: 'قماش قوي جداً وثقيل بتركيب سادة، يستخدم للحقائب والأشرعة.'
    }
  },
  {
    id: 'chambray',
    termFr: 'Chambray',
    termEn: 'Chambray',
    termAr: 'شامبراي',
    category: 'Armures',
    definition: {
      fr: 'Tissu léger ressemblant au denim, mais à armure toile (fils de chaîne colorés et trame blanche).',
      ar: 'قماش خفيف يشبه الدينيم، لكن بتركيب سادة (خيوط سداء ملونة ولحمة بيضاء).'
    }
  },
  {
    id: 'oxford',
    termFr: 'Oxford',
    termEn: 'Oxford',
    termAr: 'أوكسفورد',
    category: 'Armures',
    definition: {
      fr: 'Tissu de chemise avec une armure nattée où les fils de trame sont plus gros que ceux de chaîne.',
      ar: 'قماش قمصان بتركيب سلة حيث تكون خيوط اللحمة أسمك من خيوط السداء.'
    }
  },
  {
    id: 'organza',
    termFr: 'Organza',
    termEn: 'Organza',
    termAr: 'أورجانزا',
    category: 'Armures',
    definition: {
      fr: 'Tissu de soie ou nylon très fin, transparent et rigide.',
      ar: 'قماش من الحرير أو النايلون ناعم جداً، شفاف وصلب.'
    }
  },
  {
    id: 'crepe',
    termFr: 'Crêpe',
    termEn: 'Crepe',
    termAr: 'كريب',
    category: 'Finitions',
    definition: {
      fr: 'Tissu à l\'aspect granuleux obtenu par une torsion très forte des fils.',
      ar: 'قماش ذو مظهر حبيبي ناتج عن لوي (برم) الخيوط بشكل قوي جداً.'
    }
  },
  {
    id: 'laine-vierge',
    termFr: 'Laine Vierge',
    termEn: 'Virgin Wool',
    termAr: 'صوف بكر',
    category: 'Fibres',
    definition: {
      fr: 'Laine provenant de la première tonte de l\'animal ou n\'ayant jamais été recyclée.',
      ar: 'صوف ناتج عن أول جز للحيوان أو صوف لم يسبق تدويره.'
    }
  },
  {
    id: 'cashmere',
    termFr: 'Cachemire',
    termEn: 'Cashmere',
    termAr: 'كشمير',
    category: 'Fibres',
    definition: {
      fr: 'Laine extrêmement fine et douce provenant de la chèvre du Cachemire.',
      ar: 'صوف ناعم ورقيف جداً مستخرج من ماعز الكشمير.'
    }
  },
  {
    id: 'mohair',
    termFr: 'Mohair',
    termEn: 'Mohair',
    termAr: 'موهير',
    category: 'Fibres',
    definition: {
      fr: 'Fibre issue de la chèvre Angora, brillante et avec une grande capacité thermique.',
      ar: 'ألياف مستخرجة من ماعز الأنجورا، لامعة وذات قدرة حرارية عالية.'
    }
  },
  {
    id: 'angora',
    termFr: 'Angora',
    termEn: 'Angora',
    termAr: 'أنجورا',
    category: 'Fibres',
    definition: {
      fr: 'Poil très long et soyeux du lapin Angora.',
      ar: 'شعر طويل وحريري جداً مستخرج من أرنب الأنجورا.'
    }
  },
  {
    id: 'alpaga',
    termFr: 'Alpaga',
    termEn: 'Alpaca',
    termAr: 'ألبكة',
    category: 'Fibres',
    definition: {
      fr: 'Fibre de camélidé des Andes, plus chaude et légère que la laine de mouton.',
      ar: 'ألياف من فصيلة الجمال في جبال الأنديز، أكثر دفئاً وأخف وزناً من صوف الغنم.'
    }
  },
  {
    id: 'teinture-piece',
    termFr: 'Teinture en Pièce',
    termEn: 'Piece Dyeing',
    termAr: 'صباغة القماش (بعد النسج)',
    category: 'Finitions',
    definition: {
      fr: 'Procédé consistant à teindre le tissu une fois qu\'il a été tissé ou tricoté.',
      ar: 'عملية صباغة القماش بعد الانتهاء من نسجه أو تريكوه.'
    }
  },
  {
    id: 'teinture-fil',
    termFr: 'Teinture en Fil',
    termEn: 'Yarn Dyeing',
    termAr: 'صباغة الخيوط (قبل النسج)',
    category: 'Finitions',
    definition: {
      fr: 'Procédé consistant à teindre les fils avant le tissage (ex: pour faire du carreau ou des rayures).',
      ar: 'عملية صباغة الخيوط قبل عملية النسج (مثل أقمشة الكاروهات والمقلم).'
    }
  },
  {
    id: 'mercerisage',
    termFr: 'Mercerisage',
    termEn: 'Mercerization',
    termAr: 'مرسرة',
    category: 'Finitions',
    definition: {
      fr: 'Traitement du coton à la soude caustique pour augmenter son lustre, sa solidité et son affinité tinctoriale.',
      ar: 'معالجة القطن بالصودا الكاوية لزيادة لمعانه ومتانته وقابليته للصباغة.'
    }
  },
  {
    id: 'sanforisage',
    termFr: 'Sanforisage',
    termEn: 'Sanforization',
    termAr: 'سانفور (تثبيت الأبعاد)',
    category: 'Finitions',
    definition: {
      fr: 'Traitement mécanique visant à stabiliser le tissu pour limiter son rétrécissement au lavage.',
      ar: 'معالجة ميكانيكية تهدف إلى تثبيت أبعاد القماش للحد من انكماشه عند الغسيل.'
    }
  },
  {
    id: 'appret',
    termFr: 'Apprêt',
    termEn: 'Finishing',
    termAr: 'تجهيز نهائي',
    category: 'Finitions',
    definition: {
      fr: 'Traitements ultimes (chimiques ou mécaniques) donnés au tissu pour modifier son aspect ou ses propriétés (ex: déperlant).',
      ar: 'المعالجات النهائية (كيميائية أو ميكانيكية) التي تُجرى على القماش لتغيير مظهره أو خصائصه (مثل مقاومة الماء).'
    }
  },
  {
    id: 'deperlant',
    termFr: 'Déperlant',
    termEn: 'Water Repellent',
    termAr: 'طارد للماء',
    category: 'Finitions',
    definition: {
      fr: 'Finition qui permet à l\'eau de glisser sur la surface du tissu sans l\'imprégner.',
      ar: 'تجهيز يسمح للماء بالانزلاق على سطح القماش دون أن يتشربه.'
    }
  },
  {
    id: 'ignifuge',
    termFr: 'Ignifuge',
    termEn: 'Flame Retardant',
    termAr: 'مقاوم للحريق',
    category: 'Finitions',
    definition: {
      fr: 'Traitement rendant le tissu résistant à la propagation des flammes.',
      ar: 'معالجة تجعل القماش مقاوماً لانتشار اللهب.'
    }
  },
  {
    id: 'incoterms',
    termFr: 'Incoterms',
    termEn: 'Incoterms',
    termAr: 'المصطلحات التجارية الدولية',
    category: 'Commerce',
    definition: {
      fr: 'Règles internationales définissant les responsabilités des vendeurs et acheteurs dans le transport de marchandises.',
      ar: 'قواعد دولية تحدد مسؤوليات البائعين والمشترين في عمليات نقل البضائع.'
    }
  },
  {
    id: 'exw',
    termFr: 'EXW (Ex Works)',
    termEn: 'EXW (Ex Works)',
    termAr: 'تسليم المصنع',
    category: 'Commerce',
    definition: {
      fr: 'Incoterm où le vendeur met les marchandises à disposition dans ses locaux. L\'acheteur gère tout le transport.',
      ar: 'شرط تجاري حيث يضع البائع البضائع تحت تصرف المشتري في مقر البائع. ويدير المشتري كل عمليات النقل.'
    }
  },
  {
    id: 'cif',
    termFr: 'CIF (Cost, Insurance and Freight)',
    termEn: 'CIF',
    termAr: 'سي إف / التكلفة والتأمين والشحن',
    category: 'Commerce',
    definition: {
      fr: 'Incoterm où le vendeur paie le transport et l\'assurance jusqu\'au port de destination.',
      ar: 'شرط تجاري حيث يدفع البائع تكاليف النقل والتأمين حتى ميناء الوصول.'
    }
  },
  {
    id: 'metier-a-tisser',
    termFr: 'Métier à Tisser',
    termEn: 'Loom',
    termAr: 'نول النسيج',
    category: 'Machines',
    definition: {
      fr: 'Machine utilisée pour fabriquer du tissu en entrecroisant les fils de chaîne et de trame.',
      ar: 'الآلة المستخدمة لصناعة القماش عن طريق تقاطع خيوط السداء واللحمة.'
    }
  },
  {
    id: 'navette',
    termFr: 'Navette',
    termEn: 'Shuttle',
    termAr: 'مكوك',
    category: 'Machines',
    definition: {
      fr: 'Outil transportant le fil de trame à travers la foule sur les anciens métiers à tisser.',
      ar: 'الأداة التي تحمل خيط اللحمة عبر خيوط السداء في أنوال النسيج القديمة.'
    }
  }
];
