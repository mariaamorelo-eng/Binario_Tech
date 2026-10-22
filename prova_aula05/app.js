const express = require('express');
const cors = require('cors');

// Importação de Middlewares
const loggerMiddleware = require('./middlewares/logger');
const authMiddleware = require('./middlewares/auth');
const validaCnhMiddleware = require('./middlewares/validaCnh');

// Importação de Roteadores
const motoristasRouter = require('./routes/motoristas');
const manutencoesRouter = require('./routes/manutencoes');

const app = express();
const PORT = 3025; // Porta configurada para 3025

// 1. Middlewares Globais
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// 2. Rota Pública (Health Check)
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: "ONLINE", aplicacao: "Binario Tech API v2" });
});

// 3. Rotas Protegidas
// Aplicando validaCnhMiddleware exclusivamente na rota POST de motoristas
app.post('/api/v1/motoristas', authMiddleware, validaCnhMiddleware);
app.use('/api/v1/motoristas', authMiddleware, motoristasRouter);

app.use('/api/v1/manutencoes', authMiddleware, manutencoesRouter);

// 4. Middleware Global de Tratamento de Rota Não Encontrada (404)
app.use((req, res) => {
    res.status(404).json({ erro: "Endpoint nao encontrado no servidor Binario Tech." });
});

// 5. Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`[Binario Tech] Servidor de Middlewares ativo na porta ${PORT}`);
});
