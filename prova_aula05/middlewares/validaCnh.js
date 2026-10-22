function validaCnhMiddleware(req, res, next) {
    const { cnh } = req.body;
    const cnhValida = /^\d{11}$/.test(cnh);

    if (!cnh || !cnhValida) {
        return res.status(400).json({
            erro: "Validação falhou. O campo 'cnh' deve conter exatamente 11 dígitos numéricos."
        });
    }

    next();
}

module.exports = validaCnhMiddleware;
