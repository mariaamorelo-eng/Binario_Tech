require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBanco = require('./src/config/database');
const alertaRoutes = require('./src/routes/alertaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/alertas', alertaRoutes);

console.log('Tentando conectar ao MongoDB...');

conectarBanco()
    .then(() => {
        console.log('[Binario Tech] Conexão com o banco estabelecida!');
        app.listen(PORT, () => {
            console.log(`[Binario Tech] Servidor NoSQL ativo na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar no banco:', err.message);
    });
