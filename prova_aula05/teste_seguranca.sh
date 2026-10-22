#!/bin/bash

LOG_FILE="audit_seguranca.log"
URL="http://localhost:3025"
KEY="binario-tech-secret-2026"

echo "==========================================" > $LOG_FILE
echo "INICIANDO AUDITORIA DE SEGURANÇA E ROTAS" >> $LOG_FILE
echo "Data/Hora: $(date)" >> $LOG_FILE
echo "==========================================" >> $LOG_FILE

echo -e "\n[TESTE 1] Tentativas de acesso não autorizado (Esperado: Status 401)" >> $LOG_FILE
for i in {1..3}
do
    echo "Tentativa $i (Sem chave):" >> $LOG_FILE
    curl -s -i $URL/api/v1/motoristas | grep "HTTP/" >> $LOG_FILE
done

echo -e "\n[TESTE 2] Falha na validação de CNH (Esperado: Status 400)" >> $LOG_FILE
curl -s -i -X POST $URL/api/v1/motoristas \
  -H "X-API-KEY: $KEY" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste Falha CNH","cnh":"12345","categoria":"B"}' | grep "HTTP/" >> $LOG_FILE

echo -e "\n[TESTE 3] Rota inexistente (Esperado: Status 404)" >> $LOG_FILE
curl -s -i $URL/api/v1/clientes | grep "HTTP/" >> $LOG_FILE

echo -e "\n[TESTE 4] Acesso e Cadastro com chave válida (Esperado: Status 200/201)" >> $LOG_FILE
echo "GET /motoristas:" >> $LOG_FILE
curl -s -i -H "X-API-KEY: $KEY" $URL/api/v1/motoristas | grep "HTTP/" >> $LOG_FILE

echo "POST /motoristas (Válido):" >> $LOG_FILE
curl -s -i -X POST $URL/api/v1/motoristas \
  -H "X-API-KEY: $KEY" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Roberto Souza","cnh":"55544433322","categoria":"E"}' | grep "HTTP/" >> $LOG_FILE

echo -e "\n==========================================" >> $LOG_FILE
echo "AUDITORIA CONCLUÍDA" >> $LOG_FILE
echo "==========================================" >> $LOG_FILE

