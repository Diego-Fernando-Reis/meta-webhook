const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = "CarlosWebhook2026";
const N8N_POST_URL = "";

app.get("/webhook/meta-whatsapp", (req, res) => {
  console.log("GET recebido:", req.query);

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

app.post("/webhook/meta-whatsapp", async (req, res) => {
  console.log("POST recebido:", JSON.stringify(req.body));

  try {
    await axios.post(N8N_POST_URL, req.body, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("Enviado para n8n com sucesso");
    return res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao enviar para n8n:", error.response?.data || error.message);
    return res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando");
});
