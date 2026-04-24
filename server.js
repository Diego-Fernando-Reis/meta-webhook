const express = require("express");
const app = express();

app.use(express.json());

app.get("/webhook/meta-whatsapp", (req, res) => {
  console.log("GET recebido:", req.query);

  const verify_token = "CarlosWebhook2026";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === verify_token) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

app.post("/webhook/meta-whatsapp", (req, res) => {
  console.log("POST recebido:", JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando");
});
