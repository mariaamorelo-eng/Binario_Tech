const express = require('express');
const router = express.Router();

let manutencoes = [
    { id: 1, caminhao: "Volvo FH 540", descricao: "Troca de oleo e filtros", valor: 1500.00, status: "Aprovado" },
    { id: 2, caminhao: "Scania R450", descricao: "Substituicao de pastilhas de freio", valor: 2800.00, status: "Pendente" }
];

router.get('/', (req, res) => {
    res.status(200).json(manutencoes);
});

router.post('/', (req, res) => {
    const { caminhao, descricao, valor } = req.body;

    if (!caminhao || !descricao || !valor) {
        return res.status(400).json({ erro: "Campos 'caminhao', 'descricao' e 'valor' sao obrigatorios." });
    }

    const novaManutencao = {
        id: manutencoes.length + 1,
        caminhao,
        descricao,
        valor: Number(valor),
        status: "Pendente"
    };

    manutencoes.push(novaManutencao);
    res.status(201).json(novaManutencao);
});

module.exports = router;
