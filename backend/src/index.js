require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3001;

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.post('/api/search', async (req, res) => {
  try {
    const { query } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that provides information about CS2 (Counter-Strike 2)."
        },
        {
          role: "user",
          content: query
        }
      ],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 