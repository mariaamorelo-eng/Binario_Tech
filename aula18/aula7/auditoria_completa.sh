#!/bin/bash

LOG_FILE="auditoria.log"

echo "=== INÍCIO DA AUDITORIA DA API - $(date) ===" > "$LOG_FILE"
echo "" >> "$LOG_FILE"

testar_rota() {
  local METODO=$1
  local URL=$2
  local DADOS=$3

  echo "--------------------------------------------------" >> "$LOG_FILE"
  echo "TESTANDO: [$METODO] $URL" >> "$LOG_FILE"
  
  if [ "$METODO" = "POST" ]; then
    RESPONSE=$(curl -s -X POST "$URL" -H "Content-Type: application/json" -d "$DADOS")
  else
    RESPONSE=$(curl -s -X GET "$URL")
  fi

  echo "RESPOSTA: $RESPONSE" >> "$LOG_FILE"
  echo "" >> "$LOG_FILE"
}

testar_rota "GET" "http://localhost:3000/api/v1/telemetria/mercedes"
testar_rota "POST" "http://localhost:3000/api/v1/telemetria/mercedes" '{"modelo": "Actros Teste", "tipo": "Pesado", "ano": 2024, "vin": "123"}'
testar_rota "POST" "http://localhost:3000/api/v1/telemetria/mercedes" '{"modelo": "Actros Teste", "tipo": "Pesado", "ano": 2024, "vin": "9BM936000K12"}'

testar_rota "POST" "http://localhost:3000/api/v1/telemetria/scania" '{"modelo": "Scania Teste", "tipo": "Pesado", "ano": 2024, "vin": "123"}'
testar_rota "POST" "http://localhost:3000/api/v1/telemetria/scania" '{"modelo": "Scania Teste", "tipo": "Pesado", "ano": 2024, "vin": "9BM936000K99"}'

echo "=== FIM DA AUDITORIA ===" >> "$LOG_FILE"
echo "Auditoria concluída com sucesso!"
