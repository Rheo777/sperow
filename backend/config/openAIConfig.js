const { OpenAI } = require('openai');

// Instead of using Configuration, directly initialize OpenAIApi
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Ensure your API key is correctly loaded from the environment variables
});

module.exports = openai;
