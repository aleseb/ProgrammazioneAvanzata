# ProgrammazioneAvanzata

## Operazioni preliminari
- Scaricare la repository all'interno di una diretory attraverso il comando da terminale
```
git clone https://github.com/aleseb/ProgrammazioneAvanzata



```
### phpmyadmin

aprire phpmyadmin all'indirizzo localhost:3306. In caso di necessità di cambiare le variabili ambiente, consultare il file "database.ts" nella directory config del progetto. Importare le tabelle tramite migrazione direttamente dal terminale di visual studio con i comandi: 

-npx sequelize-cli model:generate --name Alimenti --attributes nome:string,quantita:integer,quantita_disponibile:integer (generale una tabella, in questo caso chiamata "alimenti")

-npx sequelize-cli model:generate --name Ordine --attributes stato:string,created_at:date,updated_at:date (creazione tabella "ordine")

-npx sequelize-cli db:migrate (per effettuare la migrazione)


#### postman 

Aprire postman. Creare una nuova collection che conterrà i testing delle varie rotte.
Avviare il server su visual studio code tramite il comando npm start 
Andare nella scheda request di postman e creare una richiesta, selezionare come tipo di richiesta il medesimo tipo contenuto nella rotta su visual studio code (ad esempio se una rotta è get selezionare la parola "get" su postman)
Inserire l'url della rotta ad esempio http://localhost:3000/alimenti il nome "alimenti" è il path della rotta mentre 3000 è la porta a cui si avvia il server
Andare su "header" e aggiungere una nuova intestazione con il nome Content-Type e il valore application/json.
Nel caso di dover inviare dei dati, andare su body, selezionare raw e inserire i dati in formato json. 
Infine andare su send per inviare la richiesta al server.
esempio con la tabella alimenti in riferimento alla rotta "inserire un nuovo alimento" 
{
    "nome":"banana",
    "quantita": 3
}

