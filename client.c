#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <signal.h>

#define DIM_MEX 128
//variabile per gestire se la sessione di gioco è iniziata
int partita_iniziata=0;

//funzione per ripulire il buffer
void clear_stdin() {
    int c;
    // Legge e butta via tutto finché non trova un 'a capo' o la fine del file
    while ((c = getchar()) != '\n' && c != EOF);
}

//funzione per invio messaggio al server
void invio_messaggio(int client_fd, char messaggio[DIM_MEX]){

    int lunghezza_messaggio, lung_mess_rete;

    // rimuove carattere ritorno a capo
    messaggio[strcspn(messaggio,"\n")]=0;

    // ottiene la lunghezza del messaggio 
    lunghezza_messaggio = strlen(messaggio);
    //finchè lunghezza messaggio è zero richiede inserimento
    while(lunghezza_messaggio==0){
        printf("Inserire almeno un carattere: ");
        fgets(messaggio, DIM_MEX, stdin);

        //pulisce buffer se utente invia piu di 128 caratteri
        if(strchr(messaggio,'\n')==NULL){
            clear_stdin();
        }
         // rimuove carattere ritorno a capo
        messaggio[strcspn(messaggio,"\n")]=0;
        lunghezza_messaggio=strlen(messaggio);
    }

    // Converte nel byte order di rete
    lung_mess_rete=htonl(lunghezza_messaggio); 
    //invia la lunghezza del messaggio
    send(client_fd, &lung_mess_rete, sizeof(lung_mess_rete),0);

    //invia il messaggio
    send(client_fd, messaggio, lunghezza_messaggio,0);
}

//funzione per ricezione messaggio dal server
void ricezione_risposta(int client_fd, char *messaggio, int dim_mex){

    int lunghezza_messaggio,byte_letti;

    // Riceve risposta dal server
    byte_letti = recv(client_fd, &lunghezza_messaggio, sizeof(lunghezza_messaggio), 0);
    //se i byte_letti sono zero il server si è disconnesso
    if(byte_letti<=0){
        fprintf(stderr, "ERRORE! Serve disconnesso impossibile continuare il gioco!\n");
        close(client_fd);
        exit(EXIT_FAILURE);
        return;
    }
                
    // Converte nel byte order di rete
    lunghezza_messaggio = ntohl(lunghezza_messaggio); 
                
    // legge il messaggio
    byte_letti=recv(client_fd, messaggio, lunghezza_messaggio, 0);
    if (byte_letti<=0){
        fprintf(stderr, "ERRORE! Serve disconnesso impossibile continuare il gioco!\n");
        close(client_fd);
        exit(EXIT_FAILURE);
        return;
    }

    //aggiunge carattere fine stringa e restituisce messaggio
    messaggio[byte_letti]='\0';
    return ;
}

//mostra il punteggio se richiesto dall'utente tramite show score
void  mostra_punteggio(int client_fd){
    char messaggio[DIM_MEX] = {0},risposta_server[DIM_MEX];

    //invia al server il messaggio richiedente il punteggio
    strcpy(messaggio,"show score");
    invio_messaggio(client_fd,messaggio);
    printf("\nPunteggio\n+++++++++++++++++++++++++++++++++++++++\nPunteggio tema1\n");
    //riceve e stampa la risoposta finche il server non invia finefinefine
    while(1){
        ricezione_risposta(client_fd, risposta_server,DIM_MEX);
        if(strcmp(risposta_server,"finefinefine")==0){
            break;
        }
        printf("%s: ",risposta_server);
        ricezione_risposta(client_fd, risposta_server,DIM_MEX);
        printf(" %s\n",risposta_server);
    }

    printf("\nPunteggio tema2\n");
    while(1){
        ricezione_risposta(client_fd, risposta_server,DIM_MEX);
        if(strcmp(risposta_server,"finefinefine")==0){
            break;
        }
        printf("%s: ",risposta_server);
        ricezione_risposta(client_fd, risposta_server,DIM_MEX);
        printf(" %s\n",risposta_server);
    }
    printf("\n+++++++++++++++++++++++++++++++++++++++\n");
    return;
}

//funzione per l'inserimento del comando da parte dell'utente
int inserimento_comando(){

    int comando=0;
    char ingresso[15];

    //funzione per ingresso caratteri
    fgets(ingresso, sizeof(ingresso), stdin); 
    /*verifica se in buffer è presente \n , se non present vuol dire che utente ha sforato
    dim buffer quindi chiama la funzione per ripulire il buffer*/
    if(strchr(ingresso,'\n')==NULL){
        clear_stdin();
    }
    //trovo con strcspn \n e lo sostituico con 0
    ingresso[strcspn(ingresso,"\n")]=0; 

    /*controllo per vedere se utente ha digitato end quiz o show score si utilizza insieme
    a partita_iniziata per riutilizzare la funz inserimento commando anche quando 
    utente deve scegliere fra qui e terminare senza problemi*/
    if(partita_iniziata){
        if(strcmp(ingresso,"endquiz")==0){
            partita_iniziata=2;
            return 0;
        }
        if(strcmp(ingresso,"show score")==0){
            partita_iniziata=3;
            return 0;
        }
    }
    //converte in intero comando e restituisce la variabile
    comando = atoi(ingresso);
    return comando;
}


//permette all'utente di scegliere il quiz
void scegli_quiz(int client_fd){

    char messaggio[DIM_MEX] = {0},risposta_server[DIM_MEX];
    int comando=0;

    system("clear");
    printf("Quiz Disponibili\n+++++++++++++++++++++++++++++++++++++++\n1-Curiosità sulla tecnlogia\n2-Culutura Generale\n+++++++++++++++++++++++++++++++++++++++\nLa tua scelta: ");

    ripeti:
        //inserisce il comando
        comando=inserimento_comando();
        //gestisce se l'utente richiede di terminare quiz o mostrare il punteggio
        if(partita_iniziata==2){
            strcpy(messaggio,"endquiz");
            invio_messaggio(client_fd,messaggio);
            return;
        }
        if(partita_iniziata==3){
            partita_iniziata=1;
            mostra_punteggio(client_fd);
            printf("\nLa tua scelta: ");
            goto ripeti;
        }

        //finchè il comando non è valido pulisce lo schermo e richiere il reinserimento
        while(comando !=1 && comando!=2){
            system("clear");
            printf("Quiz Disponibili\n+++++++++++++++++++++++++++++++++++++++\n1-Curiosità sulla tecnlogia\n2-Culutura Generale\n+++++++++++++++++++++++++++++++++++++++\nNell'inserimento precedente hai inserito comando non valido o nessun commando\nLa tua scelta: ");
            comando=inserimento_comando();

            //gestisce se l'utente richiede di terminare quiz o mostrare il punteggio
            if(partita_iniziata==2){
                return;
            }
            if(partita_iniziata==3){
                partita_iniziata=1;
                mostra_punteggio(client_fd);
                printf("\nLa tua scelta: ");
                goto ripeti;
            }

        }

    if(comando==1){
        strcpy(messaggio,"1");
    }
    else{
       strcpy(messaggio,"2"); 
    }
    //invia il comando al server
    invio_messaggio(client_fd,messaggio);
    //ciclo per ricezione domande, invio risposte e conferma risposta corretta/sbagliata
    for(int i=0;i<5;i++){

        ricezione_risposta(client_fd, risposta_server,DIM_MEX);
    
        //impedisce all'utente di riesguire il quiz e va a nuova richiesta comando
        if(strcmp(risposta_server,"Quiz già eseguito.")==0){
            printf("\n%s\nLa tua scelta: ",risposta_server);
            goto ripeti;
        }

        reinput:
        //stampa domanda e permette inseirmento risposta
        printf("\n%sRisposta: ",risposta_server);
        fgets(messaggio, DIM_MEX, stdin);

        
        //pulisce buffer se utente ha inviato piu di 128 caratteri
        if(strchr(messaggio,'\n')==NULL){
            clear_stdin();
        }

        if(strcmp(messaggio,"show score\n")==0){
            mostra_punteggio(client_fd);
            ricezione_risposta(client_fd, risposta_server,DIM_MEX);
            goto reinput;
        }

        //invia risposta
        invio_messaggio(client_fd,messaggio);
        //chiude in caso di invio di endquiz
        if(strcmp(messaggio,"endquiz")==0){
            partita_iniziata=2;
            return;
        }

        //riceve e stampa risposta server se risposta giusta o meno
        ricezione_risposta(client_fd, risposta_server,DIM_MEX);
        printf("%s\n",risposta_server);
    }

    printf("\nQuiz terminato, Premere invio per continuare ");
    //forza uscita testo
    fflush(stdout);
    //pulisce buffer in caso utente abbia premuto tasti invece di invio
    clear_stdin();
}

//funzione per permettere all'utente di scegliere il nickname
void scegli_nickname(int client_fd){

    char messaggio[DIM_MEX] = {0},risposta_server[DIM_MEX];

    printf("\nTrivia quiz\n+++++++++++++++++++++++++++++++++++++++\nScegli un nickname (Deve essere univoco): ");
    //ripete l'invio finche il server non da l'ok per un nickname univoco
    while(1){

        //inserisce il nickname
        fgets(messaggio, DIM_MEX, stdin);
        //ripulisce il buffer se inseriti piu di 128 caratteri
        if(strchr(messaggio,'\n')==NULL){
            clear_stdin();
        }

        //invia messaggio al server
        invio_messaggio(client_fd,messaggio);
        //ricevere risposta
        ricezione_risposta(client_fd, risposta_server,DIM_MEX);
       
        //verifica se nickname rispetta i requisiti
        if(strcmp(risposta_server,"NO")==0){
            printf("Nickname non disponibile inserirne un altro: "); 
        }
        if(strcmp(risposta_server,"NO_L")==0){
            printf("Nickname ha piu di 10 caratteri inserirne un altro con meno: "); 
        }
        if(strcmp(risposta_server,"OK")==0){
            break;
        }
    }
    return;
}

int inizio_gioco(){
    int comando=0;

    printf("Trivia quiz\n+++++++++++++++++++++++++++++++++++++++\nMenù:\n1-Comincia una sessione di Trivia\n2-Esci\n+++++++++++++++++++++++++++++++++++++++\nLa tua scelta: ");
    comando=inserimento_comando();

    //finchè non viene verificato il while si ripulisce lo schermo e richiede il comando
    while(comando !=1 && comando!=2){
        system("clear");
        printf("Trivia quiz\n+++++++++++++++++++++++++++++++++++++++\nMenù:\n1-Comincia una sessione di Trivia\n2-Esci\n+++++++++++++++++++++++++++++++++++++++\nNell'inserimento precedente hai inserito comando non valido o nessun commando\nLa tua scelta: ");
        comando=inserimento_comando();
    }

    return comando;
}

int main(int argc, char *argv[]){

    int client_fd,porta,comando;
    struct sockaddr_in server_addr;
    char *server_ip = "127.0.0.1";
   
    //in caso di errore del server il programma non viene chiuso all'istante ma mi permette prima di stampare mex di errore
   signal(SIGPIPE,SIG_IGN);
    // Leggere l'indirizzo IP e la porta dalla linea di comando
    if(argc==2){
        //converto stringa in intero
        porta=atoi(argv[1]);
    } 
    else{
        fprintf(stderr, "inserire numero di porta dopo il comando o numero di parametri corretti\n");
        exit(EXIT_FAILURE);
    }

ricomincia:
    comando=inizio_gioco();
    if(comando==1){
       
        // Creare il socket
        if((client_fd = socket(AF_INET, SOCK_STREAM, 0))==-1){
            perror("Errore nella creazione del socket");
            exit(EXIT_FAILURE);
        }

        // Configurare l'indirizzo del server
        server_addr.sin_family = AF_INET;
        server_addr.sin_port = htons(porta);

        if(inet_pton(AF_INET, server_ip, &server_addr.sin_addr)<=0){
            perror("Errore nella conversione dell'indirizzo IP");
            close(client_fd);
            exit(EXIT_FAILURE);
        }

        // Connettersi al server
        if(connect(client_fd, (struct sockaddr*)&server_addr, sizeof(server_addr))==-1){
            perror("Errore nella connessione al server");
            close(client_fd);
            exit(EXIT_FAILURE);
        }

        scegli_nickname(client_fd);
        partita_iniziata=1;
        //permette di eseguire la scelta finchè l'utente non digita endquiz
        while(1){
            scegli_quiz(client_fd);
            if(partita_iniziata==2){
                close(client_fd);
                system("clear");
                //permette di ricominciare il gioco
                goto ricomincia;
            }
        }
    }
    return 0;
}
