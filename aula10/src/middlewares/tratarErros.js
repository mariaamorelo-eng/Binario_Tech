function tratarErros(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      erro: 'JSON malformado. Verifique a sintaxe enviada no corpo da requisição.'
    });
  }

  return res.status(500).json({ erro: 'Erro interno do servidor.' });
}

module.exports = tratarErros;
