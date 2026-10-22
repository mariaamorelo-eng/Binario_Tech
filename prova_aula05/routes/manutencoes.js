const express = require('express');
const router = express.Router();

let manutencoes = [
    { id: 1, veiculo: "Caminhão Volvo FH 540", descricao: "Troca de óleo e filtros", valor: 1500.00, status: "Concluído" },
    { id: 2, veiculo: "Scania R450", descricao: "Substituição de pastilhas de freio", valor: 2800.00, status: "Pendente" }
];

// GET /api/v1/manutencoes
router.get('/', (req, res) => {
    res.status(200).json(manutencoes);
});

// POST /api/v1/manutencoes
router.post('/', (req, res) => {
    const { veiculo, descricao, valor, status } = req.body;

    if (!veiculo || !descricao || !valor) {
        return res.status(400).json({ 
            erro: "Campos 'veiculo', 'descricao' e 'valor' sao obrigatorios." 
        });
    }

    const novaManutencao = {
        id: manutencoes.length + 1,
        veiculo,
        descricao,
        valor: Number(valor),
        status: status || "Pendente"
    };

    manutencoes.push(novaManutencao);
    res.status(201).json(novaManutencao);
});

module.exports = router;
