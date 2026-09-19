#!/bin/bash

# Define a URL da API
URL="http://localhost:3000/api/v1/health"

# Faz a requisição GET e extrai apenas o HTTP Status Code
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

# Salva o Status Code no arquivo de log com a data/hora atual
echo "$(date '+%Y-%m-%d %H:%M:%S') - HTTP Status: $HTTP_STATUS" >> health_check.log

echo "Health check executado. Status Code ($HTTP_STATUS) gravado em health_check.log"
