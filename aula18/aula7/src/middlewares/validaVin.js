const validaVin = (req, res, next) => {
  const vin = req.body.vin || req.body.chassis;
  if (!vin || typeof vin !== 'string' || vin.trim().length !== 12) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Validação falhou: VIN deve ter exatamente 12 caracteres.'
    });
  }
  req.body.vin = vin.trim().toUpperCase();
  next();
};

module.exports = validaVin;
