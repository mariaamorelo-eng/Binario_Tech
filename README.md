NOME: Maria Eduarda Morelo Dias - T1DEV-T5
===========================================================================================================================================================================
04 - Atividade | Aula 04: Anatomia de uma Requisicao e Resposta HTTP (Verbos, Headers, Body, Status Codes)
Guia Passo a Passo: Exercícios de API REST no Google Cloud Shell/Servidor
Este guia contém as explicações detalhadas de conceitos, pré-requisitos, comandos e saídas esperadas para os 8 exercícios.

Sumário de Conteúdos
Pré-requisitos e Preparação do Ambiente

Exercício 01: Buscar Veículo e Formatar com jq
Exercício 02: Cadastrar Caminhão Volvo (POST)
Exercício 03: Testar Validação sem 'placa' (400 Bad Request)
Exercício 04: Filtrar por Query Param (status=DISPONIVEL)
Exercício 05: Atualizar Status para 'EM_ROTA' (PATCH)
Exercício 06: Testar Recurso Inexistente (404 Not Found)
Exercício 07: Adicionar e Testar Rota PUT (Substituição Total)
Exercício 08: Criar Script Bash de Automação (teste_crud.sh)

1. Pré-requisitos e Preparação do Ambiente
Antes de executar qualquer comando, você precisa garantir que a sua API REST está rodando e acessível no Cloud Shell.

Passo 1.1: Iniciar a aplicação/API
No seu terminal do Google Cloud Shell, navegue até a pasta do seu projeto:

Bash
cd binario_tech/aula4
Inicie o servidor da API (exemplo em node.js):

Bash
npm start
(Ou node server.js, dependendo de como o projeto foi estruturado).

Passo 1.2: Abrir uma nova aba no Cloud Shell
Como o servidor está ocupando o terminal atual rodando na porta 3000, clique no botão + (Open a new tab) no topo do Cloud Shell para abrir uma segunda aba. 
É nessa nova aba que você executará todos os comandos a seguir.

Passo 1.3: Erro sqlite3
1 - npm install-scripts approve better-sqlite3 sqlite3
2 - npm install
3 - node frota_api.js

EXERCICIO 01: Buscar Veículo de ID 1 (GET com jq)
Objetivo: Efetuar uma requisição GET buscando apenas o veículo de ID 1 e exibir o resultado formatado com jq.

Bash
curl -s -X GET http://localhost:3000/api/v1/veiculos/1 | jq .
Saída esperada:

{
  "id": 1,
  "placa": "ABC-1234",
  "montadora": "Scania",
  "modelo": "Actros",
  "status": "EM_ROTA"
}

EXERCICIO 2: Cadastrar Novo Caminhão Volvo (POST)
Objetivo: Cadastrar um novo caminhão da montadora 'Volvo' (modelo 'FH 540', placa 'KLL-9090') e verificar o status HTTP 201 Created nos cabeçalhos (-i).

Bash
curl -i -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{
    "montadora": "Volvo",
    "modelo": "FH 540",
    "placa": "KLL-9090"
  }'

  Saída:
  {"id": 3, "placa": "KLL-9090", "montadora": "Volvo", "modelo": "FH 540", "status": "DISPONIVEL"}

EXERCICIO 3: Testar Validação Sem Campo Obligatório (400 Bad Request)
Objetivo: Tentar cadastrar um veículo sem enviar o campo placa no corpo da requisição e confirmar a resposta com status 400 Bad Request.

Bash
curl -i -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{
    "montadora": "Volvo",
    "modelo": "FH 540"
  }'

  Saída esperada:
  {"erro":"Campos 'placa', 'montadora' e 'modelo' sao obrigatorios."}

EXERCICIO 4: Filtrar Veículos por Query Param (GET)
Objetivo: Fazer uma requisição GET filtrando veículos pelo status DISPONIVEL.

Bash 
curl -s -X GET "http://localhost:3000/api/v1/veiculos?status=DISPONIVEL" | jq .

Saída esperada: 
[
  {
    "id": 2,
    "placa": "KLL-9090",
    "montadora": "Volvo",
    "modelo": "FH 540",
    "status": "DISPONIVEL"
  },
  {
    "id": 3,
    "placa": "KLL-9090",
    "montadora": "Volvo",
    "modelo": "FH 540",
    "status": "DISPONIVEL"
  }
]

EXERCICIO 5: Atualizar Status para 'EM_ROTA' (PATCH)
Objetivo: Atualizar o status do veículo de ID 3 para 'EM_ROTA' utilizando a rota PATCH /api/v1/veiculos/:id/status.

Bash
curl -i -X PATCH http://localhost:3000/api/v1/veiculos/3/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "EM_ROTA"
  }'

Saída esperada:
{"mensagem":"Status atualizado com sucesso!","veiculo":{"id":3,"placa":"KLL-9090","montadora":"Volvo","modelo":"FH 540","status":"EM_ROTA"}

EXERCICIO 6: Testar Recurso Inexistente (404 Not Found)
Objetivo: Tentar atualizar ou deletar um veículo com ID inexistente (99) e validar o retorno 404 Not Found.

Bash 
curl -i -X PATCH http://localhost:3000/api/v1/veiculos/99/status \
  -H "Content-Type: application/json" \
  -d '{ "status": "EM_ROTA" }'

  Saída esperada:
  {"erro":"Veiculo nao encontrado."}

EXERCICIO 7: Adicionar e Testar Rota PUT (Substituição Total)
Objetivo: Adicionar a rota PUT na API (/api/v1/veiculos/:id) para permitir a substituição completa de um veículo.

cat << 'EOF' >> frota_api.js

// 6. PUT /api/v1/veiculos/:id - Substituição completa do veículo (Exercício 07)
app.put('/api/v1/veiculos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { montadora, modelo, placa, status } = req.body;

    // Validação: PUT exige a substituição de TODOS os campos
    if (!montadora || !modelo || !placa || !status) {
        return res.status(400).json({ 
            erro: "Os campos 'montadora', 'modelo', 'placa' e 'status' sao obrigatorios para substituicao completa." 
        });
    }

    const index = veiculos.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Veiculo nao encontrado" });
    }

    // Substitui todo o objeto mantendo o ID original
    veiculos[index] = {
        id,
        montadora,
        modelo,
        placa,
        status: status.toUpperCase()
    };

    return res.status(200).json(veiculos[index]);
});
EOF

Bash
  curl -i -X PUT http://localhost:3000/api/v1/veiculos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "placa": "NEW-9999",
    "montadora": "Scania",
    "modelo": "R500",
    "status": "DISPONIVEL"
  }'

Saída esperada: 
{"id":1,"montadora":"Scania","modelo":"R500","placa":"NEW-9999","status":"DISPONIVEL"}

EXERCICIO 8: Automation Script (teste_crud.sh)
Objetivo: Criar um script Bash que cadastra 2 veículos, atualiza 1 e deleta o outro, registrando todas as saídas no log crud_result.log.

cat << 'EOF' > teste_crud.sh
#!/bin/bash

LOG_FILE="crud_result.log"

echo "=== INICIANDO BATERIA DE TESTES AUTOMATIZADOS DE API ===" > $LOG_FILE
echo "Data da execução: $(date)" >> $LOG_FILE
echo "------------------------------------------------------" >> $LOG_FILE

echo -e "\n1. Cadastrando Primeiro Veículo (Volvo)..." >> $LOG_FILE
CAD1=$(curl -s -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa":"VOL-1111", "montadora":"Volvo", "modelo":"VM 270"}')
echo "Resposta: $CAD1" >> $LOG_FILE

echo -e "\n2. Cadastrando Segundo Veículo (DAF)..." >> $LOG_FILE
CAD2=$(curl -s -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa":"DAF-2222", "montadora":"DAF", "modelo":"XF"}')
echo "Resposta: $CAD2" >> $LOG_FILE

echo -e "\n3. Atualizando Status do Veículo ID 1 para MANUTENCAO..." >> $LOG_FILE
ATU=$(curl -s -X PATCH http://localhost:3000/api/v1/veiculos/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"MANUTENCAO"}')
echo "Resposta: $ATU" >> $LOG_FILE

echo -e "\n4. Deletando Veículo ID 2..." >> $LOG_FILE
DEL=$(curl -s -i -X DELETE http://localhost:3000/api/v1/veiculos/2)
echo "Resposta: $DEL" >> $LOG_FILE

echo -e "\n------------------------------------------------------" >> $LOG_FILE
echo "=== TESTES CONCLUÍDOS COM SUCESSO ===" >> $LOG_FILE
EOF

Bash
# Conceder permissão de execução
chmod +x teste_crud.sh

# Rodar o script
./teste_crud.sh

# Exibir os resultados gravados no log
cat crud_result.log

Saída esperada: 
=== INICIANDO BATERIA DE TESTES AUTOMATIZADOS DE API ===
Data da execução: Wed Oct 14 03:29:12 AM UTC 2026
------------------------------------------------------

1. Cadastrando Primeiro Veículo (Volvo)...
Resposta: {"id":4,"placa":"VOL-1111","montadora":"Volvo","modelo":"VM 270","status":"DISPONIVEL"}

2. Cadastrando Segundo Veículo (DAF)...
Resposta: {"id":5,"placa":"DAF-2222","montadora":"DAF","modelo":"XF","status":"DISPONIVEL"}

3. Atualizando Status do Veículo ID 1 para MANUTENCAO...
Resposta: {"mensagem":"Status atualizado com sucesso!","veiculo":{"id":1,"montadora":"Scania","modelo":"R500","placa":"NEW-9999","status":"MANUTENCAO"}}

4. Deletando Veículo ID 2...
Resposta: HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 49
ETag: W/"31-IHo0Pne/lcuLPk4qfq+tyZC4ZwE"
Date: Wed, 14 Oct 2026 03:29:12 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"mensagem":"Veiculo ID 2 removido com sucesso."}

------------------------------------------------------
=== TESTES CONCLUÍDOS COM SUCESSO ===

aula4 concluida
