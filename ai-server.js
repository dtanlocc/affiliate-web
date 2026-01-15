// ai_server.js
const express = require('express');
const { pipeline } = require('@xenova/transformers');
const app = express();
app.use(express.json());

let extractor;
async function init() {
    console.log("⏳ Đang nạp model BGE-M3 vào RTX 3060...");
    // Sử dụng sức mạnh máy nhà để xử lý AI
    extractor = await pipeline('feature-extraction', 'Xenova/bge-m3');
    console.log("✅ AI Server đã sẵn sàng tại port 3001!");
}

app.post('/embed', async (req, res) => {
    try {
        const { text } = req.body;
        const output = await extractor(text, { pooling: 'cls', normalize: true });
        const vector = Array.from(output.data);
        res.json({ vector });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

init().then(() => app.listen(3001));