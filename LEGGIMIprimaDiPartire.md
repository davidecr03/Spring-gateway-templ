1.installa le dipendenze Angular:


cd frontend && npm install

2.Compila il Backend:

mvn clean install -DskipTests


3.Cambia le variabili nel .env collegando quindi un nuovo db 
4.cambia la JWT secret

sei pronto!


#per avviare e vedere il progetto template hai 3 modi :
1.alla vecchia maniera cambi directory e mvn spring-boot:run /npm start per il front
2../start-dev.sh
3.per collaborare o progetto serio avvi tramite il docker.compose.yml

