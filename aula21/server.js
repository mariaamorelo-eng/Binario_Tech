require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3025;

app.use(express.json());

app.get('/api/v1/versao', (req, res) => {
  res.json({
    versao: "1.0.1",
    status: "online",
    timestamp: new Date()
  });
});

app.get('/api/v1/proxy/info', (req, res) => {
  res.json({
    status: "SUCESSO",
    mensagem: "Aplicação CI/CD ativa!",
    porta: PORT
  });
});

app.listen(PORT, () => {
  console.log(`[Binário Tech] Aplicação rodando na porta ${PORT}`);
});
