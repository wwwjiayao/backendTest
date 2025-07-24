// server.js
const express = require('express');
const cors = require('cors');
const { quoteSummary, historical } = require('yahoo-finance2').default;

const app = express();
app.use(cors()); // 允许跨域
const PORT = 3000;

// 获取股票当前价格 & 简要信息
app.get('/api/quote/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const data = await quoteSummary(symbol, { modules: ['price'] });
    res.json(data.price);
  } catch (err) {
    res.status(500).json({ error: '获取失败' });
  }
});

// 获取历史价格数据（例如过去 30 天）
app.get('/api/history/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const queryOptions = { period1: '1mo', interval: '1d' };
    const result = await historical(symbol, queryOptions);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: '历史数据获取失败' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
