# huShhh
huShhh è nato dalla consapevolezza dell’inquinamento acustico urbano e della sua influenza sulla qualità della vita. Il nostro obiettivo è aiutare le persone a trovare il giusto equilibrio tra quiete e vivacità, migliorando le loro esperienze quotidiane nelle città.
L’inquinamento acustico è un problema crescente nelle città moderne, influenzando negativamente il benessere delle persone.
Allo stesso tempo, è importante trovare luoghi con il giusto livello di vivacità per diverse occasioni.
huShhh mappa le zone di rumore e di quiete, aiutando le persone a scegliere i luoghi più adatti alle loro esigenze, sia che cerchino tranquillità sia che desiderino un ambiente animato per eventi o serate sociali.
## Funzionamento
- Per avviare una registrazione, cliccare sull'icona posta in alto a sinistra dello schermo: identifica l'apertura del microfono e l'inizio dello stream di dati verso il server (NB vanno garantiti i permessi di registrazione per il microfono). Lo stream di dati fornisce l'intensita' media del suono circostante nell'intervallo di 10 secondi e lo invia al server e questo dato si andra' ad aggiungere a quelli gia' caricati sul database e quindi visualizzabili sulla mappa geolocalizzato, con visibilita' e colorazione proporzionale all'intensita' registrata.
- Il pulsante in alto a destra apre un menu' a tendina che permette l'accesso a varie sottosezioni del sito, tra cui la pagina di login e registrazione, la pagina utente, tasto di logout, panoramica del progetto e possibilita' di cambiare il tema della pagina.
- IMPORTANTE: PER INVIARE UN DATO AL DATABASE SERVE EFFETTUARE IL LOGIN CON LE CREDENZIALI DELL'UNICO UTENTE PER ORA INSERITO user: 'a@b.it' pw: 'ciao"
## Installazione docker
Per lanciare l'applicazione e' necessario avere Docker installato sul vostro sistema.
```bash
  make
```
Nella root lanciate 'make' con sudo e il Makefile installera' i Container e le immagini relative.
L'idea era di implementare frontend, backend, e database. Purtroppo non c'e' stato abbastanza bene per sistemare tutto :_)Connettersi tramite localhost:5173. La funzione di login non e' completa, la richiesta viene correttamente fatta al database ma non viene salvato l'utente, quindi manca la persistenza dei dati. Tutto viene fatto per la sessione corrente.
Bisogna abilitare sia la geolocalizzazione che il microfono per utilizzare il servizio.

AVVISO POST PUSH
Ci siamo accorti che non venivano caricati gli elementi nel database per mostrare le varie rivelazioni sonora in alcune aree.
Basta lanciare lo script in python (avendo ovviamente python3 installato) dopo che sono stati caricati i container. Serve anche il connector di mysql (pip install mysql-connector-python).
Ci scusiamo per il disagio!
