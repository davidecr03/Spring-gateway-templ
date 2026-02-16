🚀 Spring Boot & Angular Microservices Template
Questo repository è un Template Ready-to-Use per un'architettura a microservizi moderna. Include un sistema di autenticazione centralizzato con JWT, un API Gateway per il routing e un frontend Angular Standalone.

🏗️ Struttura del Progetto
backend/api-gateway: Gateway basato su Spring Cloud Gateway. Gestisce la sicurezza e smista le richieste (Porta 8080).

backend/user-service: Gestisce l'autenticazione, la registrazione e il database utenti (Porta 8081).

frontend: Applicazione Angular 17+ con architettura standalone e gestione stato del login.

docker.compose.yml: Configurazione per avviare PostgreSQL e l'intero stack.

⚙️ Configurazione Iniziale
Prima di avviare il progetto, crea un file .env nella cartella root partendo dall'esempio:

# Database Configuration
DB_NAME=users_db
DB_USER=admin
DB_PASSWORD=secret

# JWT Security (Deve essere identica per Gateway e User-Service)
JWT_SECRET=LaTuaChiaveSegretaMoltoLungaEComplessaAlmeno32Caratteri
Assicurati che nei file application.properties dei servizi backend le variabili siano richiamate correttamente (es. ${DB_PASSWORD}).

🚀 Come Avviare
1. Modalità Sviluppo (Ibrida - Consigliata)
Usa Docker solo per il database, lanciando i servizi localmente per sfruttare l'Hot Reload.

Database: docker compose up -d postgres

User Service: cd backend/user-service && ./mvnw spring-boot:run

API Gateway: cd backend/api-gateway && ./mvnw spring-boot:run

Frontend: cd frontend && npm install && npm start

2. Modalità Full Docker
Avvia l'intero ecosistema in container separati:

docker compose up --build
🔒 Flusso di Autenticazione (JWT)
Login: L'utente invia le credenziali a POST :8080/auth/login.

Token: Lo User-Service valida e restituisce un JWT.

Routing: Il Gateway intercetta ogni richiesta verso /users/**.

Validation: Il JwtAuthFilter del Gateway verifica la validità e la firma del token. Se non valido, restituisce 401 Unauthorized.

🛠️ Note Tecniche per il Riutilizzo
Rotte Pubbliche: Gestite nel Gateway tramite RouteValidator (es. /auth/login, /auth/register).

CORS: Configurato nel Gateway per permettere le chiamate dal frontend (localhost:4200).

Standalone Components: Il frontend non usa AppModule, rendendo i componenti leggeri e facili da spostare.

📖 Come usare questo Template
Se vuoi creare un nuovo progetto basato su questa struttura:

Clicca sul tasto "Use this template" in alto a destra su GitHub.

Dai un nome al tuo nuovo repository.

Clona il tuo nuovo repository e inizia a sviluppare!

Autore: davidecr03
