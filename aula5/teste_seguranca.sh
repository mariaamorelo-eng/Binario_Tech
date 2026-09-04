#!/bin/bash

LOG_FILE="audit_seguranca.log"

echo "=== INICIO DA AUDITORIA DE SEGURANCA: $(date) ===" > "$LOG_FILE"
echo "" >> "$LOG_FILE"

echo "--- [1/3] Tentativa Sem API Key #1 (GET /api/v1/motoristas) ---" >> "$LOG_FILE"
curl -s -i http://localhost:3000/api/v1/motoristas >> "$LOG_FILE"
echo -e "\n" >> "$LOG_FILE"

echo "--- [2/3] Tentativa Sem API Key #2 (GET /api/v1/manutencoes) ---" >> "$LOG_FILE"
curl -s -i http://localhost:3000/api/v1/manutencoes >> "$LOG_FILE"
echo -e "\n" >> "$LOG_FILE"

echo "--- [3/3] Tentativa Sem API Key #3 (POST /api/v1/manutencoes) ---" >> "$LOG_FILE"
curl -s -i -X POST http://localhost:3000/api/v1/manutencoes \
  -H "Content-Type: application/json" \
  -d '{"caminhao": "Volvo FH 540", "descricao": "Troca de oleo", "valor": 1200}' >> "$LOG_FILE"
echo -e "\n" >> "$LOG_FILE"

echo "--- [4/4] Tentativa Com API Key Valida (GET /api/v1/manutencoes) ---" >> "$LOG_FILE"
curl -s -i -H "X-API-KEY: binario-tech-secret-2026" http://localhost:3000/api/v1/manutencoes >> "$LOG_FILE"
echo -e "\n" >> "$LOG_FILE"

echo "=== FIM DA AUDITORIA DE SEGURANCA ===" >> "$LOG_FILE"

echo "Auditoria concluida! Resultados salvos em '$LOG_FILE'."
