const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

// Modelo de Usuário
const User = mongoose.model('User', new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
}));

// Conexão com o Banco
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/binario_tech_prova');

// Q1: Registro (Post /register)
app.post('/api/v1/prova/register', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha || senha.length < 6) {
    return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres.' });
  }
  const senhaHash = await bcrypt.hash(senha, 10);
  const user = await User.create({ email, senha: senhaHash });
  res.status(201).json({ id: user._id, email: user.email });
});

// Q2: Login (Post /login)
app.post('/api/v1/prova/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(senha, user.senha))) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30m' });
  res.json({ token });
});

// Q3: Middleware e Rota Protegida (Get /relatorio)
const validarJWT = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Token ausente' });
  try {
    req.user = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Token inválido' });
  }
};

app.get('/api/v1/prova/relatorio', validarJWT, (req, res) => {
  res.json({ status: 'Acesso autorizado', usuario: req.user });
});

app.listen(process.env.PORT || 3000, () => console.log('Servidor rodando'));
