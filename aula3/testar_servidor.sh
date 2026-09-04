#!/bin/bash

echo "========================================"
echo "    INICIANDO TESTE DO SERVIDOR"
echo "========================================"

echo ""
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Testando rota: /status"
http GET http://localhost:3001/status

echo ""
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Testando rota: /scania/info"
http GET http://localhost:3001/scania/info

echo ""
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Testando rota: /vw/info"
http GET http://localhost:3001/vw/info
