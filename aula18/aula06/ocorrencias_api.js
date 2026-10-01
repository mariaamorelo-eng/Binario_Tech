const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const ARQUIVO_DADOS = path.join(__dirname, 'ocorrencias.json');

app.use(cors());
app.use(express.json());

// Função Auxiliar: Ler Arquivo JSON
async function lerOcorrencias() {
    try {
        const dados = await fs.readFile(ARQUIVO_DADOS, 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        await fs.writeFile(ARQUIVO_DADOS, '[]', 'utf-8');
        return [];
    }
}

// Função Auxiliar: Salvar no arquivo JSON
async function salvarOcorrencias(ocorrencias) {
    await fs.writeFile(ARQUIVO_DADOS, JSON.stringify(ocorrencias, null, 2), 'utf-8');
}

// ROTA 1: Listar todas as ocorrências
app.get('/api/v1/ocorrencias', async (req, res) => {
    try {
        const ocorrencias = await lerOcorrencias();
        res.status(200).json(ocorrencias);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao ler base de dados em disco." });
    }
});

// ROTA: Buscar ocorrências filtrando pela montadora
app.get('/api/v1/ocorrencia/montadora/:nome', async (req, res) => {
    try {
        const nomeMontadora = req.params.nome;
        const ocorrencias = await lerOcorrencias();

        const filtradas = ocorrencias.filter(
            o => o.montadora && o.montadora.toLowerCase() === nomeMontadora.toLowerCase()
        );

        res.status(200).json(filtradas);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar ocorrências por montadora." });
    }
});

// ROTA 2: Cadastrar nova ocorrência na frota
app.post('/api/v1/ocorrencias', async (req, res) => {
    try {
        const { montadora, placa, descricao, gravidade } = req.body;

        if (!montadora || !placa || !descricao) {
            return res.status(400).json({ erro: "Montadora, placa e descricao sao obrigatorios." });
        }

        const ocorrencias = await lerOcorrencias();
        const novaOcorrencia = {
            id: Date.now(),
            montadora,
            placa,
            descricao,
            gravidade: gravidade || "MEDIA",
            data_registro: new Date().toISOString()
        };

        ocorrencias.push(novaOcorrencia);
        await salvarOcorrencias(ocorrencias);

        res.status(201).json(novaOcorrencia);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao salvar ocorrencia em disco." });
    }
});

// ROTA NOVA: Deletar ocorrência por ID
app.delete('/api/v1/ocorrencia/:id', async (req, res) => {
    try {
        const idParaRemover = Number(req.params.id);
        const ocorrencias = await lerOcorrencias();

        // Procura se o ID existe
        const indice = ocorrencias.findIndex(o => o.id === idParaRemover);

        if (indice === -1) {
            return res.status(404).json({ erro: "Ocorrencia nao encontrada." });
        }

        // Remove a ocorrência do array
        const [ocorrenciaRemovida] = ocorrencias.splice(indice, 1);

        // Salva a lista atualizada no arquivo JSON
        await salvarOcorrencias(ocorrencias);

        res.status(200).json({
            mensagem: "Ocorrencia removida com sucesso.",
            ocorrencia: ocorrenciaRemovida
        });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao deletar ocorrencia do disco." });
    }
});

app.listen(PORT, () => {
    console.log(`[Binario Tech] API de Ocorrencias ativa na porta ${PORT}`);
});
