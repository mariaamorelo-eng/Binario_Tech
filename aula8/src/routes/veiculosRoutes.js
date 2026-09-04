const express = require('express');
const router = express.Router();
const veiculosController = require('../controllers/veiculosController');
const db = require('../database/connection');

router.get('/:id', veiculosController.buscarPorId);

router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const atualizado = await db('veiculos').where({ id }).update({ status });
  if (!atualizado) return res.status(404).json({ mensagem: 'Veículo não encontrado' });
  return res.json({ mensagem: 'Status atualizado com sucesso' });
});

module.exports = router;
