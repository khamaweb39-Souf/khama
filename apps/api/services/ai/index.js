const USE_AI = process.env.USE_AI === 'true';

let aiService;

if (USE_AI && process.env.OPENAI_API_KEY) {
  aiService = require('./openai');
} else if (USE_AI && process.env.GROQ_API_KEY) {
  aiService = require('./groq');
} else {
  aiService = require('./rules');
}

module.exports = aiService;
