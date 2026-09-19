require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_simulado';

// Middleware para autenticar o JWT
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ erro: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
}

// Exercício 1 - Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Exercício 2 - Gerador de Token JWT
app.post('/api/v1/auth/token-teste', (req, res) => {
  const payload = { user: 'aluno_simulado', role: 'tester' };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5m' });
  return res.status(200).json({ sucesso: true, token });
});

// Exercício 4 - Rota Privada Protegida por JWT
app.get('/api/v1/simulado/status', autenticarToken, (req, res) => {
  res.status(200).json({
    status: 'Ativo',
    usuario: req.user.user,
    role: req.user.role
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
