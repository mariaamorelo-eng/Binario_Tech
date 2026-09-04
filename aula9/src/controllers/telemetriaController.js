
exports.buscarPorVeiculo = async (req, res) => {
  const { id } = req.params;
  const leituras = await db('telemetria').where({ veiculo_id: id });
  return res.json(leituras);
};

exports.listarRelatorioCompleto = async (req, res) => {
  const { alerta } = req.query;
  let query = db('telemetria');

  if (alerta === 'true') {
    query = query.where('temperatura_motor', '>', 95);
  }

  const resultados = await query;
  return res.json(resultados);
};
