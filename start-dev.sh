#!/bin/bash

# Identifica la cartella corrente
ROOT_DIR=$(pwd)

echo "🐘 Verifica Database (Native)..."
# Verifichiamo se Postgres è in ascolto sulla porta standard 5432
if lsof -Pi :5432 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Postgres è già attivo."
else
    echo "❌ Errore: Postgres NON è attivo sulla porta 5432."
    echo "Per favore, avvia l'app Postgres o il servizio brew prima di continuare."
    exit 1
fi

echo "🏗️  Compilazione moduli..."
mvn clean install -DskipTests

echo "🚀 Apertura terminali di servizio..."

# Comando per lo User Service
osascript -e "tell application \"Terminal\" to do script \"cd '$ROOT_DIR/backend/user-service' && mvn spring-boot:run\""

# Comando per l'API Gateway
osascript -e "tell application \"Terminal\" to do script \"cd '$ROOT_DIR/backend/api-gateway' && mvn spring-boot:run\""

# Comando per Angular
osascript -e "tell application \"Terminal\" to do script \"cd '$ROOT_DIR/frontend' && npm start\""

echo "✅ Ambiente di sviluppo pronto!"