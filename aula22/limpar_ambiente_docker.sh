#!/bin/bash
echo "=================================================="
echo "   LIMPEZA DO AMBIENTE DOCKER - BINÁRIO TECH"
echo "=================================================="

echo "[1/2] Removendo containers parados..."
docker container prune -f

echo "[2/2] Removendo imagens pendentes (dangling images)..."
docker image prune -f

echo "=================================================="
echo "[SUCESSO] Limpeza de ambiente Docker concluída!"
echo "=================================================="
