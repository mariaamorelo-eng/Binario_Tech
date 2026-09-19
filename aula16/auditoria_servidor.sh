echo "========================"
echo " AUDITORIA DE SERVIDOR "
echo "========================"

echo "Listando status de execusao dos processos Node.js"
ps aux | grep node >> ./process.log

echo "Resultado da Lista:"
sleep 2
cat processos.log
