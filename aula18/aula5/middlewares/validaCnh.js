const validaCnhMiddleware = (req, res, next) => {
    const { cnh } = req.body;

    const cnhString = cnh ? String(cnh).trim() : '';
    const regexCnh = /^\d{11}$/;

    if (!cnhString || !regexCnh.test(cnhString)) {
        return res.status(400).json({ 
            erro: "CNH invalida. A CNH deve conter exatamente 11 digitos numericos." 
        });
    }

    next();
};

module.exports = validaCnhMiddleware;
