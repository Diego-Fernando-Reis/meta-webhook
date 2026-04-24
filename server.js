const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "CarlosWebhook2026";
const N8N_POST_URL = "https://utilitdigital-n8n-webhook.c4wjlz.easypanel.host/webhook/meta-whatsapp-post";

app.get("/webhook/meta-whatsapp", (req, res) => {
const mode = req.query["hub.mode"];
const token = req.query["hub.verify_token"];
const challenge = req.query["hub.challenge"];

if (mode === "subscribe" && token === VERIFY_TOKEN) {
return res.status(200).send(challenge);
}

return res.sendStatus(403);
});

app.post("/webhook/meta-whatsapp", async (req, res) => {
try {
await axios.post(N8N_POST_URL, req.body, {
headers: { "Content-Type": "application/json" }
});

```
return res.sendStatus(200);
```

} catch (error) {
return res.sendStatus(500);
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
