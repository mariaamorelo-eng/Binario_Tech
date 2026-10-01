#!/bin/bash

echo "=================================================="
echo "    PIPELINE DE DEPLOY AUTOMATIZADO - BINÁRIO TECH"
echo "=================================================="

echo "[1/4] Atualizando código-fonte do repositório remoto..."
cd /home/maria_e_dias10/curso-pbe1/binario_tech
git pull origin main

echo "[2/4] Verificando e instalando novas dependências..."
cd /home/maria_e_dias10/curso-pbe1/binario_tech/aula21
npm install

echo "[3/4] Reiniciando aplicação no PM2..."
pm2 restart api-cicd --update-env

echo "[4/4] Executando Smoke Test na API (Porta 3025)..."
sleep 2

# Testa a rota /api/v1/proxy/info na porta 3025
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3025/api/v1/proxy/info || echo "000")

# Caso não exista essa rota, tenta a rota /status-nginx ou a raiz /
if [ "$HTTP_STATUS" -eq 404 ]; then
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3025/status-nginx || echo "000")
fi

if [ "$HTTP_STATUS" -eq 200 ]; then
    echo "=================================================="
    echo "[SUCESSO] Deploy realizado e Smoke Test aprovado (200 OK)!"
    echo "=================================================="
else
    echo "=================================================="
    echo "[FALHA] Smoke Test falhou com status $HTTP_STATUS! Verifique os logs do PM2."
    echo "=================================================="
    pm2 logs api-cicd --lines 20 --nostream
    exit 1
fi
