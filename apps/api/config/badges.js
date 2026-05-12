const BADGES = {
  VERIFIED: {
    code: 'VERIFIED',
    name: { ar: 'موثق رسمياً', fr: 'Vérifié', en: 'Verified' },
    color: '#1E40AF',
    icon: '✓',
    type: 'MANUAL',
    criteria: {
      requiredDocs: ['commercial_register', 'id_card']
    },
    isRevocable: true
  },
  ON_TIME: {
    code: 'ON_TIME',
    name: { ar: 'دقة المواعيد', fr: 'Ponctuel', en: 'On Time' },
    color: '#059669',
    icon: '⚡',
    type: 'AUTOMATIC',
    criteria: {
      metric: 'on_time_rate',
      threshold: 0.95,
      period: 90,
      minOrders: 10
    },
    isRevocable: true
  },
  ZERO_DISPUTES: {
    code: 'ZERO_DISPUTES',
    name: { ar: 'صفر نزاعات', fr: 'Sans litiges', en: 'Zero Disputes' },
    color: '#6B7280',
    icon: '🛡️',
    type: 'AUTOMATIC',
    criteria: {
      minOrders: 50,
      maxDisputeRate: 0.02
    },
    isRevocable: true
  },
  MADE_IN_ALGERIA: {
    code: 'MADE_IN_ALGERIA',
    name: { ar: 'صنع في الجزائر', fr: 'Made in Algeria', en: 'Made in Algeria' },
    color: '#166534',
    icon: '🇩🇿',
    type: 'MANUAL',
    criteria: {
      description: 'إنتاج محلي 100% موثق'
    },
    isRevocable: false
  },
  GOLD_CUSTOMER: {
    code: 'GOLD_CUSTOMER',
    name: { ar: 'زبون ذهبي', fr: 'Client Gold', en: 'Gold Customer' },
    color: '#D4AF37',
    icon: '💜',
    type: 'AUTOMATIC',
    criteria: {
      minOrders: 5,
      maxDisputeRate: 0
    },
    isRevocable: true
  }
};

module.exports = BADGES;
