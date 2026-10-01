const db = require('../database/connection');

exports.buscarPorId = async (req, res) => {
  const { id } = req.params;
  const veiculo = await db('veiculos').where({ id }).first();
  if (!veiculo) return res.status(404).json({ mensagem: 'Veículo não encontrado' });
  return res.json(veiculo);
};
