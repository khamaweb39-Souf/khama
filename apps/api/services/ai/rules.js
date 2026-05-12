const PRICE_RULES = {
  'قماش قطن': { base: 800 },
  'قماش جينز': { base: 1200 },
  'جلد طبيعي': { base: 5000 },
  'بوليستر': { base: 450 },
};

const DISCOUNTS = [
  { minQty: 100, discount: 0.05 },
  { minQty: 500, discount: 0.10 },
  { minQty: 1000, discount: 0.15 },
];

function analyzeRFQ(rfq) {
  const rule = PRICE_RULES[rfq.productType];
  
  if (!rule) {
    return {
      source: 'Rules-based',
      analysis: 'لا توجد بيانات تسعير آلية لهذا المنتج حالياً. سيقوم الموردون بتقديم عروضهم اليدوية.'
    };
  }
  
  let basePrice = rule.base * rfq.quantity;
  const discount = DISCOUNTS
    .filter(d => rfq.quantity >= d.minQty)
    .sort((a, b) => b.discount - a.discount)[0];
  
  if (discount) basePrice *= (1 - discount.discount);
  
  return {
    source: 'Rules-based',
    analysis: `التقدير الأولي: ${Math.round(basePrice).toLocaleString()} دج. (يتضمن خصم كمية ${ (discount?.discount || 0) * 100}%). يرجى التأكد من المواصفات الفنية للحصول على السعر النهائي.`
  };
}

function generateClarifications(rfq) {
  const questions = [];
  if (!rfq.specifications?.color) questions.push('ما هو اللون المطلوب؟');
  if (!rfq.specifications?.weight && rfq.productType?.includes('قماش')) questions.push('ما هو وزن القماش المطلوب (GSM)؟');
  if (!rfq.specifications?.width) questions.push('ما هو العرض المطلوب؟');
  return questions;
}

module.exports = { analyzeRFQ, generateClarifications, estimatePrice: analyzeRFQ };
