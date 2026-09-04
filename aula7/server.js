const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Importa as rotas
const mercedesRoutes = require('./src/routes/mercedesRoutes');
const scaniaRoutes = require('./src/routes/scaniaRoutes');

// Aplica as rotas
app.use('/api/v1/telemetria/mercedes', mercedesRoutes);
app.use('/api/v1/telemetria/scania', scaniaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
