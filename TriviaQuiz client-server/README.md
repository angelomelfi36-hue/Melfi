# TriviaQuiz Client-Server
---

## 📌 Descrizione del Progetto
Il progetto consiste nello sviluppo di un'applicazione distribuita per un gioco di **Trivia Quiz**, basata sul modello **Client-Server** su architettura di rete **TCP/IP**. 

Il sistema è composto da:
*   **Server**: Centralizza il controllo dei dati, gestisce i punteggi, valida i nickname e invia le domande.
*   **Client**: Agisce puramente come interfaccia di input/output, trasmettendo le scelte dell'utente e visualizzando i messaggi ricevuti dal server.

---

## 🛠️ Architettura di Sistema

### Server Concorrente Multithread
L'implementazione si basa su un server concorrente multithread (`pthread`).
*   **Motivazione:** Questa scelta permette di gestire ogni client tramite un thread dedicato. Le operazioni bloccanti di I/O (come l'attesa della risposta a una domanda) non interferiscono con le sessioni degli altri giocatori, offrendo una gestione parallela ed efficiente.
*   **Analisi Critica:** Il modello offre semplicità nella programmazione e una facile gestione della classifica globale grazie allo spazio di indirizzamento condiviso. L'overhead di memoria introdotto dallo stack dei singoli thread è da considerarsi trascurabile nel contesto dell'applicazione rispetto ai vantaggi in termini di bassa latenza.

---

## 📨 Protocollo di Comunicazione e Scambio Dati
La comunicazione avviene tramite **socket di tipo STREAM (TCP)**, scelta fondamentale per garantire l'integrità e il corretto ordine di consegna di domande e risposte, evitando la perdita di pacchetti.

Per gestire stringhe di lunghezza variabile e prevenire la frammentazione del flusso TCP, è stato implementato un **protocollo di messaggistica esplicito**:
1.  **Invio Lunghezza:** Il mittente trasmette un intero a 32 bit che rappresenta la lunghezza in byte del messaggio. Viene utilizzata la funzione `htonl()` per convertire il dato nel *network byte order*, garantendo l'interoperabilità tra architetture diverse.
2.  **Invio Corpo:** Successivamente, viene inviato il corpo del messaggio (stringa).
3.  **Ricezione:** Il ricevente legge i primi 4 byte tramite `recv()`, converte la lunghezza con `ntohl()` e procede alla lettura del numero esatto di byte rimanenti.

Questo approccio ottimizza l'uso della banda rispetto a un protocollo a lunghezza fissa.

---

## 💾 Gestione dei Dati e Sincronizzazione

### Strutture Dati e I/O
*   I partecipanti sono gestiti tramite una **lista concatenata dinamica** (`data_giocatori`). Ogni nodo memorizza nickname, punteggi per i due temi e stato di completamento del quiz.
*   I file `domande.txt` e `risposte.txt` vengono letti **in fase di esecuzione** e non pre-caricati interamente, riducendo l'impronta di memoria iniziale del server.

### Sincronizzazione (Mutex)
Poiché la lista dei giocatori e il contatore degli utenti connessi sono risorse condivise, l'accesso avviene in mutua esclusione tramite Mutex (`pthread_mutex_t`).
*   La registrazione del nickname avviene in **sezione critica** per verificare l'univocità del nome.
*   L'uso dei lock è stato limitato alle sole operazioni strettamente necessarie per non penalizzare le prestazioni complessive.

---

## ⚖️ Analisi Critica: Pregi e Difetti

### ✅ Pregi
*   **Gestione Disconnessioni:** Il server intercetta le disconnessioni improvvise (valore di ritorno $\le 0$ della `recv`). Il thread rimuove l'utente dalla classifica in mutua esclusione, libera la memoria e chiude il descrittore del socket.
*   **Flessibilità della Classifica:** L'ordinamento avviene tramite un array di appoggio usando l'algoritmo **Bubble Sort**. Questo permette di mostrare i dati in modo decrescente senza dover mantenere la lista concatenata costantemente ordinata, semplificando gli inserimenti dei nodi.

### ❌ Difetti e Sviluppi Futuri
*   **Scalabilità dell'I/O:** L'apertura e la lettura dei file su disco per ogni singolo quiz potrebbe diventare un collo di bottiglia in presenza di centinaia di richieste simultanee.
*   **Sicurezza:** Il protocollo attuale non prevede crittografia. In un contesto reale e commerciale, sarebbe opportuno integrare **TLS/SSL** per proteggere i dati in transito.
