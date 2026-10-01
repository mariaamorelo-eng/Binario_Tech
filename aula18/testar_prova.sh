#!/bin/bash

BASE_URL="http://localhost:3000/api/v1/prova"
EMAIL="aluno_prova_$RANDOM@binario.tech"
SENHA="senhaSegura123"

echo "=================================================="
echo "      TESTE AUTOMATIZADO DA PROVA - AULA 18"
echo "=================================================="
echo ""

echo "[1/3] Cadastrando novo usuário ($EMAIL)..."
CADASTRO_RES=$(curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"senha\": \"$SENHA\"}")
echo $CADASTRO_RES | jq .
echo ""

echo "[2/3] Efetuando login e obtendo Token JWT..."
LOGIN_RES=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"senha\": \"$SENHA\"}")

TOKEN=$(echo $LOGIN_RES | jq -r '.token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "[ERRO] Falha ao obter o token no login."
  echo $LOGIN_RES | jq .
  exit 1
fi

echo "Token obtido com sucesso: ${TOKEN:0:25}..."
echo ""

echo "[3/3] Acessando Rota Protegida (/relatorio) com o Token JWT..."
RELATORIO_RES=$(curl -s -X GET "$BASE_URL/relatorio" \
  -H "Authorization: Bearer $TOKEN")

echo $RELATORIO_RES | jq .
echo ""
echo "=================================================="
echo "              TESTES CONCLUÍDOS!"
echo "=================================================="

===============================================================================
