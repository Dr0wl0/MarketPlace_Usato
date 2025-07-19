Documentazione Tecnica - Progetto Marketplace

Descrizione Generale

Progetto di Marco Chieffa, Massimo Baffa e Grabiele Boileau, i ruoli sono stati suddivisi in:

Marco Chieffa => Back-end + Front-end
Massimo Baffa => Back-end + Front-end
Grabiele Boileau => Front-end

L'applicazione è sviluppata utilizzando Spring Boot per il back-end(architettura a micro-servizi)e Angular per il front-end.

Il progetto consiste in un'applicazione web per la gestione di un Marketplace. Gli utenti possono registrarsi, effettuare il login, visualizzare annunci, inserirne di nuovi, modificarli, aggiungerli ai preferiti e cercare tra gli annunci tramite filtri. Inoltre, ogni utente ha accesso a un'area personale dove può gestire i propri annunci preferiti ed effettuare il logout.

--------------------------------------
Funzionalità Principali

1. Autenticazione e Registrazione

Registrazione di nuovi utenti

Login degli utenti registrati

Gestione della sessione utente (logout incluso)

2. Gestione Annunci

Visualizzazione della lista degli annunci disponibili

Inserimento di nuovi annunci

Modifica e aggiornamento degli annunci esistenti

Aggiunta e rimozione di annunci dai preferiti

3. Ricerca Annunci

Ricerca tramite:

Categoria

Nome (o parole chiave)

4. Area Personale Utente

Visualizzazione degli annunci aggiunti ai preferiti e creati dall'utente / possibilità di Logout

5. Carrello
Possibilità di aggiungere ed eliminare annunci dal carrello

----------------------------------

Tecnologie Utilizzate

Back-end (Spring Boot)

Spring Web

Spring Data JPA

Hibernate

H2 in-memory DB

Lombok

discovery server

apy.gateway

Maven

Micro-servizi organizzati per funzionalità (es. login-registration-service, listing-service, ecc.)
----------------------------------
Front-end (Angular)

Angular CLI

Angular Router

Angular Material (UI components)

RxJS per la gestione asincrona

Servizi per la comunicazione HTTP con il back-end
----------------------------------

Guida all'Installazione e Avvio del Progetto

1. Requisiti Preliminari

Java 17+

Node.js (v18+)

Angular CLI

H2 in-memory 

IntelliJ IDEA

Visual Studio Code
-----------------------------------

2. Clonazione del Progetto

git clone: https://github.com/Dr0wl0/MarketPlace_Usato

-----------------------------------

3. Apertura e Avvio dei Servizi Back-end

Aprire IntelliJ IDEA

Aprire separatamente ogni micro-servizio presente nella cartella Back-End

Configurare i file application.properties o application.yml se necessario (es. credenziali DB)

Avviare tutti i micro-servizi

4. Apertura e Avvio del Front-end

Aprire Visual Studio Code

Aprire la cartella Front-End

Installare le dipendenze:

npm install

Avviare l'applicazione Angular:

ng serve
-----------------------------------
5. Accesso all'Applicazione

Aprire un browser e navigare verso:

http://localhost:4200

Verrà caricata la pagina di login/registrazione

-----------------------------------

Note Aggiuntive

Tutti i micro-servizi devono essere attivi prima di avviare il front-end, altrimenti alcune funzionalità risulteranno non disponibili.
