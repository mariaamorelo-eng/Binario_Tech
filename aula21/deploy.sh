#!/bin/bash

echo "=================================================="
echo "    PIPELINE DE DEPLOY AUTOMATIZADO - BINÁRIO TECH"
echo "=================================================="

echo "[1/4] Verificando diretório..."
cd /home/maria_e_dias10/curso-pbe1/binario_tech/aula21

echo "[2/4] Instalando dependências locais..."
npm install

echo "[3/4] Reiniciando processo no PM2..."
pm2 restart api-cicd --update-env || PORT=3025 pm2 start server.js --name "api-cicd"

echo "[4/4] Executando Smoke Test na API (Porta 3025)..."
sleep 2

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3025/api/v1/versao || echo "000")

if [ "$HTTP_STATUS" -eq 200 ]; then
    echo "=================================================="
    echo "[SUCESSO] Deploy realizado e Smoke Test aprovado (200 OK)!"
    echo "=================================================="
    
    COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "local")
    DATA_HORA=$(date "+%Y-%m-%d %H:%M:%S")
    echo "[$DATA_HORA] Deploy realizado com sucesso. Commit: $COMMIT_HASH" >> deploy_history.log
    echo "Histórico gravado em deploy_history.log"
else
    echo "=================================================="
    echo "[FALHA] Smoke Test falhou com status $HTTP_STATUS! Verifique os logs do PM2."
    echo "=================================================="
    pm2 logs api-cicd --lines 20 --nostream
    exit 1
fi
