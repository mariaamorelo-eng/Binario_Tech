#!/bin/bash

LOG_FILE="/var/log/nginx/access.log"

# Verifica se o arquivo de log existe
if [ -f "$LOG_FILE" ]; then
    echo "=== Últimas 15 requisições com status 200 OK ==="
    tail -n 15 "$LOG_FILE" | grep " 200 "
else
    echo "Aviso: O arquivo $LOG_FILE não existe no ambiente do Cloud Shell."
fi
