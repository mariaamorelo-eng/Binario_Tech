const express = require('express');
const app = express();
const PORT = 3025;

app.use(express.json());

app.get('/api/v1/status-servidor', (req, res) => {
	res.json({
		status: "ONLINE", 
		ambiente: "Servidor Local de Prova - Binario Tech",
		usuario: process.env.USER || "aluno",
		dataCheck: new Date() 
	});
});

app.listen(PORT, () => {
	console.log(`[Binario Tech] Servidor de Validacao da Aula 16 ativo na porta ${PORT}`);
});
