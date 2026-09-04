const express = require('express');
const cors = require('cors');
const telemetriaRoutes = require ('./scr/routes/telemetriaRoutes'0

	const app = express();
	const PORT = 3000;

	app.use(cors());
	app.use(express.json());

	app.use((req,res) => {
		res.status(404).json({ erro: Rota nao encontrada na binario ntech." });
	});


