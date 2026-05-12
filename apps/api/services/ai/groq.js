const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function analyzeRFQ(rfq) {
  const response = await groq.chat.completions.create({
    model: 'llama3-8b-8192',
    messages: [
      {
        role: 'system',
        content: 'أنت خبير في صناعة المنسوجات والجلود في الجزائر. حلل الطلبات بدقة.'
      },
      {
        role: 'user',
        content: `حلل طلب RFQ باللغة العربية: ${JSON.stringify(rfq)}`
      }
    ]
  });
  
  return {
    source: 'Groq (Llama3)',
    analysis: response.choices[0].message.content
  };
}

module.exports = { analyzeRFQ };
