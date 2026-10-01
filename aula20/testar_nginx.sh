#!/bin/bash
echo "=================================================="
echo "    AUDITORIA DE PROXY REVERSO NGINX - BINÁRIO TECH"
echo "=================================================="

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3025/api/v1/proxy/info)

echo "Testando acesso na porta 3025..."
echo "HTTP Status Code: $HTTP_CODE"

if [ "$HTTP_CODE" -eq 200 ]; then
  echo -e "\n[OK] Servidor respondeu com sucesso!"
else
  echo -e "\n[ERRO] Falha no acesso. Verifique se o servidor Node está ativo."
fi
echo "=================================================="
