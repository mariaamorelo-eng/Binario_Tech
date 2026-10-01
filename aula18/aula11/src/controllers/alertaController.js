const Alerta = require('../models/Alerta');

const criarAlerta = async (req, res) => {
    try {
        const novoAlerta = await Alerta.create(req.body);
        return res.status(201).json({
            status: 'sucesso',
            dados: { alerta: novoAlerta }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'erro',
            mensagem: error.message
        });
    }
};

const buscarPorSeveridade = async (req, res) => {
    try {
        const { nivel } = req.params;
        const alertas = await Alerta.find({ nivelSeveridade: nivel });

        return res.status(200).json({
            status: 'sucesso',
            resultados: alertas.length,
            dados: { alertas }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'erro',
            mensagem: error.message
        });
    }
};

module.exports = {
    criarAlerta,
    buscarPorSeveridade
};
