const express = require('express');
const app = express();

app.use(express.json());

const provaRoutes = require('./src/routes/provaRoutes');

app.use('/api/v1/provaRoutes', provaRoutes);

const PORT = 3025;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
