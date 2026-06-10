#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <netinet/in.h>
# include <pthread.h>
#include <signal.h>

#define DIM_MEX 128
#define LUNG_NICKNAME 10
#define BACKLOG 8

pthread_mutex_t M;
struct dati_giocatori* utenti=NULL;
int utenti_connessi=0;

//struttura per memorizzazione utenti e punteggi
struct dati_giocatori{

    char nickname[LUNG_NICKNAME];
    int punteggio1;
    int quiz1_compl;
    int punteggio2;
    int quiz2_compl;
    struct dati_giocatori *succ;

};

//funzione per invio messaggio al client
void invio_messaggio(int client_fd, char messaggio[DIM_MEX]){

    int lunghezza_messaggio, lung_mess_rete;

    // ottiene la lunghezza del messaggio 
    lunghezza_messaggio = strlen(messaggio);

    // Converto nel byte order di rete
    lung_mess_rete = htonl(lunghezza_messaggio); 
    //invia la lunghezza del messagigo
    send(client_fd, &lung_mess_rete, sizeof(lung_mess_rete), 0);

    //invia il messaggio
    send(client_fd, messaggio, lunghezza_messaggio, 0);
}

//funzione che rimuove l'utente passatto come parametro in modo da renderne nuovamente disp nickname
void rimuovi_utente(struct dati_giocatori* utente_corrente){

    struct dati_giocatori* p=utenti;
    struct dati_giocatori *last = NULL;
    while(p!=NULL){
        if(strcmp(p->nickname,utente_corrente->nickname) == 0) {

            //se utente_corrente è il primo della lista
            if (last == NULL) {
                utenti = p->succ;
            } 
            else {
                last->succ = p->succ;
            }

            utente_corrente=NULL;
            // Libera la memoria allocata con malloc
            free(p); 
            return;
        }
        last = p;
        p = p->succ;
    }
}

//agiorna a video il numero di utenti presenti
void aggiorna_utenti(){
    //ripulisce lo schermo per la nuova stampa
    system("clear");
    printf("Trivia quiz\n+++++++++++++++++++++++++++++++++++++++\nTemi:\n1-Curiosità sulla tecnlogia\n2-Culutura Generale\n+++++++++++++++++++++++++++++++++++++++\n");
   
    pthread_mutex_lock(&M);
        //stampa numero e nomi dei partecipanti
        printf("partecipanti (%d)\n",utenti_connessi);
            struct dati_giocatori* p=utenti;
            while(p!=NULL){
                printf("-%s\n",p->nickname);
                p=p->succ;
            }
    pthread_mutex_unlock(&M);
}

//funzione che stampa gli utenti che hanno completato il quiz e il relativo punteggio e invia
//la classufuca se richiesta da qualche client
void aggiorna_display(int n,int client_fd){
    char messaggio[DIM_MEX] = {0};
    pthread_mutex_lock(&M); 

        // Se non ci sono utenti connessi stampa solo le intestazioni e termina
        if(utenti_connessi<=0){
            printf("\nQuiz 1.\n");
            printf("\nQuiz 2.\n");

            printf("\nQuiz 1 completato\n");
            printf("\nQuiz 2 completato\n");

            pthread_mutex_unlock(&M);
            return;
        }

        //strutture di appoggio per riordinare gli utenti in modo da stampare la classifica in ordine decrscente
        struct dati_giocatori *temp;
        struct dati_giocatori **array = malloc(utenti_connessi * sizeof(struct dati_giocatori *));
        struct dati_giocatori **array2 = malloc(utenti_connessi * sizeof(struct dati_giocatori *));
        

        //controllo di sicurezza sull'allocazione dinamica
        if(array==NULL || array2==NULL){
            perror("Errore malloc classifica");
            if (array != NULL) free(array);
            if (array2 != NULL) free(array2);
            pthread_mutex_unlock(&M);
            return;
        }

        //riempimento array
        temp= utenti;
        for(int i=0; i<utenti_connessi; i++){
            if(temp==NULL){ break;} 
            array[i] = temp;
            array2[i]=temp;
            temp = temp->succ;
        }

        //ordinamento utenti in base al punteggio1
        for(int i=0; i<utenti_connessi-1; i++){
            for (int j=0; j<utenti_connessi-i-1; j++){
                
                int p_attuale =array[j]->punteggio1;
                int p_succ =array[j+1]->punteggio1;

                if(p_attuale<p_succ){ 
                    struct dati_giocatori *scambio=array[j];
                    array[j]=array[j+1];
                    array[j+1]=scambio;
                }
            }
        }

        //ordinamento utenti in base al punteggio2
        for(int i =0; i <utenti_connessi-1; i++){
            for(int j =0; j <utenti_connessi-i-1; j++){
                
                int p_attuale =array2[j]->punteggio2;
                int p_succ =array2[j+1]->punteggio2;

                if(p_attuale <p_succ){ 
                    struct dati_giocatori *scambio =array2[j];
                    array2[j] =array2[j+1];
                    array2[j+1] =scambio;
                }
            }
        }

        //sampa finale 
        printf("\nQuiz 1.\n");
        for(int i = 0; i < utenti_connessi; i++){
            if(array[i]->quiz1_compl!=0){
                //se parametro n è 1 invio al client la classifica in quanto vuol dire che l'ha richiesta
                if(n==1){

                    printf("ci entra\n");
                    sprintf(messaggio, "%s", array[i]->nickname);
                    invio_messaggio(client_fd,messaggio);
                    sprintf(messaggio, "%d", array[i]->punteggio1);
                    invio_messaggio(client_fd,messaggio);
                }
                printf("%s : %i\n",array[i]->nickname,array[i]->punteggio1);
            }
        }
        // invio al client il messaggio per segnalare la fine dell'invio della classifica
        if(n==1){
            strcpy(messaggio,"finefinefine");
            invio_messaggio(client_fd,messaggio);
        }

        //stesso di su
        printf("\nQuiz 2.\n");
        for(int i = 0; i < utenti_connessi; i++){
            if(array2[i]->quiz2_compl!=0){
            if(n==1){

                    sprintf(messaggio, "%s", array2[i]->nickname);
                    invio_messaggio(client_fd,messaggio);
                    sprintf(messaggio, "%d", array2[i]->punteggio2);
                    invio_messaggio(client_fd,messaggio);
                }
                printf("%s : %i\n",array2[i]->nickname,array2[i]->punteggio2);
            }
        }
        if(n==1){
            strcpy(messaggio,"finefinefine");
            invio_messaggio(client_fd,messaggio);
        }

        printf("\nQuiz 1 completato\n");
        for(int i = 0; i < utenti_connessi; i++){
            if(array[i]->quiz1_compl!=0){
                printf("%s\n",array[i]->nickname);
            }
        }

        printf("\nQuiz 2 completato\n");
        for(int i = 0; i < utenti_connessi; i++){
            if(array2[i]->quiz2_compl!=0){
                printf("%s\n",array2[i]->nickname);
            }
        }   
        
        free(array); 
        free(array2); 
    pthread_mutex_unlock(&M); 
}

//incremento punteggio degli utenti
void  incrementa_punteggio(int n2,int esito,struct dati_giocatori* utente_corrente){
   //entra nell'if solo se l'utente ha completato il quiz e setta il parametro per registrare l'evento
   if (esito == 1) {
        if (n2 <= 6) {
             utente_corrente->quiz1_compl++;
        } 
        else {
             utente_corrente->quiz2_compl++;
        } 
    } 
    //incrementa punteggio utenti in base al parametro n2 che permette di distinguere il punteggio del quiz
    if (esito == 0) {
        if (n2 <= 6) {
             utente_corrente->punteggio1++;
        } 
        else {
             utente_corrente->punteggio2++;
        }
    }
}


//funzione per ricezione messaggio dal client
void ricezione_risposta(int client_fd,struct dati_giocatori* utente_corrente,char *messaggio, int dim_mex){

    int lunghezza_messaggio,byte_letti;
    // Riceve risposta dal cleint
    byte_letti = recv(client_fd, &lunghezza_messaggio, sizeof(lunghezza_messaggio), 0);
   //se i byte_letti sono zero il client si è disconnesso
    if(byte_letti <= 0) {
        //rimuove il client dal conteggio dei connessi e rimuove i suoi dati
        pthread_mutex_lock(&M);
            utenti_connessi--;
            if(utente_corrente != NULL) {
                rimuovi_utente(utente_corrente);
            }

        pthread_mutex_unlock(&M);

        //aggiorna display server di num utenti e classifcia
        aggiorna_utenti();
        aggiorna_display(0,0);

        close(client_fd);
        pthread_exit(NULL);
        return ;
    }
                
    // Converte nel byte order di rete
    lunghezza_messaggio = ntohl(lunghezza_messaggio); 
                
    // legge il messaggio
    byte_letti = recv(client_fd, messaggio, lunghezza_messaggio, 0);
    if (byte_letti <= 0) {
        //come su
        pthread_mutex_lock(&M);
            utenti_connessi--;

             if(utente_corrente != NULL) {
                rimuovi_utente(utente_corrente);
            }

        pthread_mutex_unlock(&M);
        aggiorna_utenti();
        aggiorna_display(0,0);

        close(client_fd);
        pthread_exit(NULL);
        return ;
    }

    //aggiunge carattere di fine stringa e restituisce messaggio
    messaggio[byte_letti] = '\0';  
    return ;
}

//funzione per inviare le domande al client e ricevere le risposte
void invia_domande(FILE *fd,FILE *fd_risposte, int n1,int n2,int client_fd, struct dati_giocatori* utente_corrente){

    char messaggio[DIM_MEX] = {0}, risposte[DIM_MEX] = {0},risposta_client[DIM_MEX];
    int riga_corrente=1;

    //in caso si abbiano problemi nell'aprire il file
    if(fd==NULL ||fd_risposte==NULL ){
        printf("Problema nell'accesso al file");
        pthread_exit(NULL);
        return;
    }
    //scorre le varie righe del file
    while(fgets(messaggio, sizeof(messaggio), fd)!=NULL && fgets(risposte, sizeof(risposte), fd_risposte)!=NULL){

        //in base dalle righe ricevute come parametri invia le domande per il quiz
        if(riga_corrente>=n1 && riga_corrente<=n2){
            rinvio:
            invio_messaggio(client_fd, messaggio);
            ricezione_risposta(client_fd,utente_corrente,risposta_client,DIM_MEX);
            risposte[strcspn(risposte, "\n")] = 0; 

            if(strcmp(risposta_client,"show score")==0){
                aggiorna_utenti();
                aggiorna_display(1,client_fd);
                goto rinvio;
            }

            if (strcmp(risposta_client, "endquiz") == 0) {
                // Chiudiamo i file aperti in questa funzione
                fclose(fd);
                fclose(fd_risposte);
                
                // Rimuoviamo l'utente dalla lista in modo sicuro (usa il mutex come fai in ricezione_risposta)
                pthread_mutex_lock(&M);
                    utenti_connessi--;
                    if(utente_corrente!=NULL){
                        rimuovi_utente(utente_corrente);
                    }
                pthread_mutex_unlock(&M);

                // Aggiorniamo la console del server
                aggiorna_utenti();
                aggiorna_display(0, 0);

                // Chiudiamo il socket e uccidiamo il thread
                close(client_fd);
                pthread_exit(NULL);
                return;
            }

             //confronta la risposta del client con il file delle risposte
            if(strcmp(risposta_client,risposte)==0){
                // se corretta invia il messaggio di conferma e aggiorna punteggio
                strcpy(messaggio,"Risposta corretta.");
                incrementa_punteggio(n2,0, utente_corrente);
            }
            //altrimenti invia messaggio di risposta sbagliata
            else{
                strcpy(messaggio,"Risposta errata.");
            }
            invio_messaggio(client_fd, messaggio);
        }

        riga_corrente++;
        //interrompe ciclo
        if(riga_corrente >n2){
            break;
        }
    
    }

    incrementa_punteggio(n2,1, utente_corrente);
    aggiorna_utenti();
    aggiorna_display(0,0);

}

//funzione che permette all'utente di eseguire il quiz
void esegui_quiz(int client_fd,struct dati_giocatori* utente_corrente){

    FILE *fd;
    FILE *fd_risposte;
   char risposta_client[DIM_MEX],messaggio[DIM_MEX] = {0};

    //si prende la richiesta del client e in base ad essa si gestiscono i vari if
    ricezione_risposta(client_fd,utente_corrente,risposta_client,DIM_MEX);
    //se ha richiesto di terminare il quiz
    if(strcmp(risposta_client,"endquiz")==0){
        return;
    }

    //se ha richiesto di visualizzare il punteggio
    if(strcmp(risposta_client,"show score")==0){
        aggiorna_utenti();
        aggiorna_display(1,client_fd);
        return;
    }
    //se ha richiesto quiz 1
    if(strcmp(risposta_client,"1")==0){

        if(utente_corrente->quiz1_compl){
            strcpy(messaggio,"Quiz già eseguito.");
            invio_messaggio(client_fd, messaggio);
            return;
        }
        //si apre file di domande e risposte e si inviano le domande tramite la funzione invia domande
        fd=fopen("domande.txt","r");
        fd_risposte=fopen("risposte.txt","r");
        invia_domande(fd,fd_risposte,2,6,client_fd,utente_corrente);
    }
    else{

        //stesso di su
        if(utente_corrente->quiz2_compl!=0){
            strcpy(messaggio,"Quiz già eseguito.");
            invio_messaggio(client_fd, messaggio);
            return;
        }

        fd=fopen("domande.txt","r");
        fd_risposte=fopen("risposte.txt","r");
        invia_domande(fd,fd_risposte,8,12,client_fd,utente_corrente);
    }

    fclose(fd);
    fclose(fd_risposte);
}

//funzione per validare il nickname
int valida_nickname(const char *messaggio,struct dati_giocatori** utente_corrente){

    //nickname troppo lungo
    if(strlen(messaggio)>LUNG_NICKNAME){
        return -2; 
    }

    //la validazione è gestita in mutua escluzione
    pthread_mutex_lock(&M);

        struct dati_giocatori *p = utenti;
        struct dati_giocatori *last = NULL;

        while(p!=NULL){

            //l'utente esiste già
            if(strcmp(p->nickname,messaggio)==0){
                pthread_mutex_unlock(&M);
                return -1;
            }
            last=p;
            p=p->succ;
        }

        //si crea la struct per inserire il nuovo utente
        struct dati_giocatori* nuovo = malloc(sizeof(struct dati_giocatori));
        // si inizializzano i necessari campi
        strcpy(nuovo->nickname,messaggio);
        nuovo->punteggio1=0;
        nuovo->quiz1_compl=0;
        nuovo->punteggio2=0;
        nuovo->quiz2_compl=0;
        nuovo->succ=NULL;

        //lista vuota , primo utente
        if(utenti==NULL){
            utenti=nuovo;
        }
        else{
            last->succ=nuovo;
        }
        *utente_corrente=nuovo;

    pthread_mutex_unlock(&M);
    return 0;
}

//funzione per assegnare il nickname richiesto dal client
void assegna_nickname(int client_fd,struct dati_giocatori** utente_corrente){

    //il ciclo termina solo quando il nickname viene assegnato corretamente
    while(1){
        char messaggio[DIM_MEX] = {0},risposta_client[DIM_MEX];
        int val_ritorno;

        //si riceve la porposta di nickname dal clinet
        ricezione_risposta(client_fd,NULL,risposta_client,DIM_MEX);

        //si valida il nickname
        val_ritorno=valida_nickname(risposta_client,utente_corrente);
        // se nickname valido si rispodne al client "OK" e si esce dal ciclo
        if(val_ritorno==0){
            strcpy(messaggio,"OK");
            invio_messaggio(client_fd,messaggio);
            break;
        }
        //altrimenti si invia al client "NO " se nickname non univoco o NO_L se nickname piu lungo di 10 caratteri
        if(val_ritorno==-1){
            strcpy(messaggio,"NO");
        }
        else{
           strcpy(messaggio,"NO_L"); 
        }
        
        invio_messaggio(client_fd,messaggio);
    }

    return ;
}

void *gestisci_connesione_thread(void *client_fd_thread){

    //creazione strutture dati necessarie per il thread
    struct dati_giocatori* utente_corrente=NULL;
    int client_fd=*((int*)client_fd_thread); 
    free(client_fd_thread);

    assegna_nickname(client_fd,&utente_corrente);

    pthread_mutex_lock(&M);
        utenti_connessi++;
    pthread_mutex_unlock(&M);

    aggiorna_utenti();
    aggiorna_display(0,0);

    //termina quando ricezione risposta rileva disconnesione
    while(1){
          esegui_quiz(client_fd,utente_corrente);
    }
     
    close(client_fd);
    pthread_exit(NULL);
   
}

int main(){

    int sockfd, port = 1234;
    int* client_fd_thread ;
    struct sockaddr_in server_addr, client_addr;
    socklen_t client_len = sizeof(client_addr);
    pthread_t thread_id;

    signal(SIGPIPE,SIG_IGN);
    //inizializza il semaforo
    pthread_mutex_init(&M, NULL);

    // crea il socket
    if((sockfd = socket(AF_INET, SOCK_STREAM, 0))==-1){
        perror("Errore nella creazione del socket");
        exit(EXIT_FAILURE);
    }

    // Configurare l'indirizzo del server
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(port);

    // associa il socket all'indirizzo e alla porta
    if(bind(sockfd, (struct sockaddr*)&server_addr, sizeof(server_addr))==-1){
        perror("Errore nel binding del socket");
        close(sockfd);
        exit(EXIT_FAILURE);
    }

    // mette il server in ascolto
    if(listen(sockfd, BACKLOG)==-1){
        perror("Errore nella listen");
        close(sockfd);
        exit(EXIT_FAILURE);
    }

    //ciclo del main in cui si accettano le connesioni richieste dai client
    while(1){

        //mostra schermata server con num utenti collegati, nickname e quali hanno completato quiz e punteggio ottenuto
        aggiorna_utenti();
        aggiorna_display(0,0);

        client_fd_thread=malloc(sizeof(int));
        if(!client_fd_thread) {
            perror("malloc fallito");
            continue;
        }

        //accetta connesione
        *client_fd_thread=accept(sockfd,(struct sockaddr*)&client_addr, &client_len);

        //gestione collezione fallita
        if(*client_fd_thread==-1){
            perror("Errore nell'accettazione della connessione");
            free(client_fd_thread);
            continue;
        }

        //se creazione thread ha creato problemi
        if(pthread_create(&thread_id, NULL, gestisci_connesione_thread, client_fd_thread)!=0){
            perror("Errore nella creazione del thread");
            close(*client_fd_thread);
            free(client_fd_thread);
            continue;
        }
        //rimozione legame padre figlio
        pthread_detach(thread_id);  
    }

    return 0;
}