#!/bin/bash

LOG_FILE="crud_result.log"

echo "=== INÍCIO DOS TESTES CRUD - $(date) ===" > "$LOG_FILE"
echo "" >> "$LOG_FILE"

API_URL="http://localhost:3000/api/v1/veiculos"

echo "1. Cadastrando o primeiro veículo..." | tee -a "$LOG_FILE"
curl -s -i -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"montadora": "Volvo", "modelo": "FH 540", "placa": "ABC1D23", "status": "DISPONIVEL"}' >> "$LOG_FILE"
echo -e "\n\n---------------------------------------\n" >> "$LOG_FILE"

echo "2. Cadastrando o segundo veículo..." | tee -a "$LOG_FILE"
curl -s -i -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"montadora": "Scania", "modelo": "R 450", "placa": "XYZ9K88", "status": "EM_MANUTENCAO"}' >> "$LOG_FILE"
echo -e "\n\n---------------------------------------\n" >> "$LOG_FILE"

echo "3. Atualizando o veículo de ID 1 (Status para EM_ROTA)..." | tee -a "$LOG_FILE"
curl -s -i -X PATCH "$API_URL/1" \
  -H "Content-Type: application/json" \
  -d '{"status": "EM_ROTA"}' >> "$LOG_FILE"
echo -e "\n\n---------------------------------------\n" >> "$LOG_FILE"

echo "4. Deletando o veículo de ID 2..." | tee -a "$LOG_FILE"
curl -s -i -X DELETE "$API_URL/2" >> "$LOG_FILE"
echo -e "\n\n---------------------------------------\n" >> "$LOG_FILE"

echo "=== TESTES CONCLUÍDOS ===" | tee -a "$LOG_FILE"
