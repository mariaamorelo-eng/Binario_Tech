#!/bin/bash
echo "=== Monitorando logs unificados (web-api e redis-cache) ==="
docker compose logs -f web-api redis-cache
