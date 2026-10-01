#!/bin/bash
URL="http://localhost:3000/api/v1/prova"
EMAIL="user_$(date +%s)@prova.com"

# 1. Cadastrar
curl -s -X POST "$URL/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"senha\":\"123456\"}" | jq .

# 2. Login e extração do Token
TOKEN=$(curl -s -X POST "$URL/login" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"senha\":\"123456\"}" | jq -r '.token')

# 3. Testar Rota Protegida
curl -s -X GET "$URL/relatorio" -H "Authorization: Bearer $TOKEN" | jq .
