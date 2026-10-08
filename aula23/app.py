from flask import Flask, jsonify
import redis
import os

app = Flask(__name__)

redis_url = os.getenv('REDIS_URL', 'redis://redis-cache:6379')
r = redis.from_url(redis_url)

@app.route('/api/v1/visitas', methods=['GET'])
def visitas():
    try:
        count = r.incr('contador_visitas')
        return jsonify({"visitas": count, "status": "sucesso"}), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route('/api/v1/visitas/reset', methods=['DELETE'])
def reset_visitas():
    try:
        r.delete('contador_visitas')
        return jsonify({"mensagem": "Contador de visitas zerado com sucesso", "status": "sucesso"}), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
