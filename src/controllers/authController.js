const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

// QUESTÃO 1: Endpoint de Registro com Hash de Senha (bcryptjs, salt 10)
exports.registrar = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  const { email, senha } = req.body;

  try {
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    }

    // Criptografia da senha com bcryptjs (salt 10)
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = await Usuario.create({
      email,
      senha: senhaHash
    });

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: { id: novoUsuario._id, email: novoUsuario.email }
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro interno ao registrar usuário.' });
  }
};

// QUESTÃO 2: Endpoint de Login com retorno de Token JWT (30 min)
exports.login = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    // Gerar JWT contendo id e email com expiração de 30 minutos
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      token
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro interno ao realizar login.' });
  }
};

// Relatório Privado (Questão 3)
exports.obterRelatorio = async (req, res) => {
  return res.status(200).json({
    status: 'SUCESSO',
    mensagem: 'Acesso autorizado ao relatório da prova!',
    usuarioAutenticado: req.usuario,
    dataGeracao: new Date()
  });
};
