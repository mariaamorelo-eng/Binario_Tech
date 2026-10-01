let frotaScania = [];

const adicionarCaminhao = (req, res) => {
  const { modelo, tipo, ano, vin } = req.body;
  const novo = { id: frotaScania.length + 1, modelo, tipo, ano, vin };
  frotaScania.push(novo);
  res.status(201).json({ sucesso: true, dados: novo });
};

module.exports = {
  adicionarCaminhao
};
