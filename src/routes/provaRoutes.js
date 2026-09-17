const express = require('express');
const router = express.Router();

// Suas rotas da prova aqui
router.get('/', (req, res) => {
    res.json({ mensagem: 'Rota da prova funcionando!' });
});

module.exports = router;
