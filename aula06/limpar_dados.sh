#!/bin/bash

echo "=================================================="
echo "      RESET DE AMBIENTE - BINARIO TECH"
echo "=================================================="

# 1. Encerra qualquer processo Node.js em execução
echo -e "\n[1] Encerrando processos Node.js..."
pkill -f node 2>/dev/null && echo "✓ Processo Node encerrado com sucesso." || echo "ℹ Nenhum processo Node em execução."

# 2. Remove o arquivo de dados ocorrencias.json
echo -e "\n[2] Removendo arquivo ocorrencias.json..."
if [ -f "ocorrencias.json" ]; then
    rm -f ocorrencias.json
    echo "✓ Arquivo ocorrencias.json excluído com sucesso."
else
    echo "ℹ Arquivo ocorrencias.json não encontrado."
fi

echo -e "\n=================================================="
echo "   AMBIENTE LIMPO E PRONTO PARA NOVOS TESTES!"
echo "======================================================="
