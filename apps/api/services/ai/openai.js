const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeRFQ(rfq) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `أنت خبير في صناعة المنسوجات والجلود في الجزائر. ساعد في تحليل طلبات عروض الأسعار واقتراح الأسعار.`
      },
      {
        role: 'user',
        content: `حلل طلب RFQ التالي:
          النوع: ${rfq.productType}
          الكمية: ${rfq.quantity} ${rfq.unit}
          المواصفات: ${JSON.stringify(rfq.specifications)}
          
          قدم باللغة العربية:
          1. سعر تقريبي (دج)
          2. أسئلة توضيحية إذا المواصفات ناقصة
          3. ملاحظات للمشتري لضمان أفضل عرض`
      }
    ],
    max_tokens: 500
  });
  
  return {
    source: 'OpenAI',
    analysis: response.choices[0].message.content
  };
}

module.exports = { analyzeRFQ };
