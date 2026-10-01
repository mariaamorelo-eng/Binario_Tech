let frota = [
  { id: 1, modelo: 'Actros 2651', tipo: 'Pesado', ano: 2023, vin: '9BM936000K12' }
];

const listarFrota = (req, res) => {
  res.status(200).json({ sucesso: true, dados: frota });
};

const adicionarCaminhao = (req, res) => {
  const { modelo, tipo, ano, vin } = req.body;
  const novo = { id: frota.length + 1, modelo, tipo, ano, vin };
  frota.push(novo);
  res.status(201).json({ sucesso: true, dados: novo });
};

const buscarPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const caminhao = frota.find(c => c.id === id);
  if (!caminhao) return res.status(404).json({ mensagem: 'Não encontrado' });
  res.status(200).json({ sucesso: true, dados: caminhao });
};

module.exports = { listarFrota, adicionarCaminhao, buscarPorId };
