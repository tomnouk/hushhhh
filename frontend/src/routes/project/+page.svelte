<script >
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    let ready = false;
    let scrollY = 0;

    onMount(() => {
        ready = true;

        const updatePage = () => {
            scrollY = window.scrollY;
			calculateColor(scrollY);
            const intro = document.querySelector('.intro');
            const technologie = document.querySelector('.technologie');
            const business = document.querySelector('.business');
            const futur = document.querySelector('.futur');
            const impatto = document.querySelector('.impatto');
			const newOpacity = 2 - scrollY / 1000;
            const newOpacity2 = 2 - scrollY / 1500;
            const newOpacity3 = 2 - scrollY / 2000;
            const newOpacity4 = 2 - scrollY / 3000;
            const newOpacity5 = 2 - scrollY / 4000;
            intro.style.opacity = newOpacity;
            technologie.style.opacity = newOpacity2;
            business.style.opacity = newOpacity3;
            futur.style.opacity = newOpacity4;
            impatto.style.opacity = newOpacity5;
			
        };

        window.addEventListener('scroll', updatePage);

        return () => {
            window.removeEventListener('scroll', updatePage);
        };
    });

    function calculateColor(scroll) {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const percentage = Math.min(scroll / maxScroll, 1);
        const greenValue = Math.floor(50 * percentage);
        const blueValue = Math.floor(20 * percentage);
        return `rgb(0, ${greenValue}, ${blueValue})`;
    }
</script>

<div class="title">
    <p>Our Project</p>
</div>
<div class="intro">
    <p>INTRODUZIONE <br><br><br>
        huShhh è nato dalla consapevolezza dell’inquinamento acustico urbano e della sua influenza sulla 
        qualità della vita.
        Il nostro obiettivo è aiutare le persone a trovare il giusto equilibrio tra quiete e vivacità, 
        migliorando le loro esperienze quotidiane nelle città.<br>
        L’inquinamento acustico è un problema crescente nelle città moderne, influenzando negativamente il 
        benessere delle persone.<br>
        Allo stesso tempo, è importante trovare luoghi con il giusto livello di vivacità per diverse 
        occasioni.
        huShhh mappa le zone di rumore e di quiete, aiutando le persone a scegliere i luoghi più adatti alle 
        loro esigenze, sia che cerchino tranquillità sia che desiderino un ambiente animato per eventi o 
        serate sociali. </p>
</div>

<div class="technologie">
    <p>TECNOLOGIE UTILIZZATE <br><br><br>
        La nostra tecnologia avanzata garantisce una raccolta e un’elaborazione dei dati accurata, sicura e 
        rispettosa della privacy degli utenti.<br>
        Utilizziamo algoritmi sofisticati per monitorare e analizzare i livelli di rumore ambientale.
        Questi algoritmi permettono di ottenere dati precisi e utili per gli utenti.<br>
        La privacy dei nostri utenti è la nostra priorità.
        I dati di rumore raccolti sono anonimizzati; solo le espressioni numeriche dei picchi di decibel 
        vengono inviate al server.
        Non conserviamo dati personali, garantendo così la massima sicurezza e riservatezza.<br>
        La nostra infrastruttura è progettata per essere scalabile.
        Con l’aumento degli utenti e delle richieste, i nostri server possono gestire un volume crescente di 
        dati senza compromettere la velocità e l’efficienza.<br>
        L’app è dotata di un’interfaccia intuitiva che rende semplice per chiunque registrare e visualizzare i 
        dati sul rumore.
        Grazie a un design user-friendly, gli utenti possono facilmente navigare tra le varie funzionalità 
        dell’app.<br>
        Utilizziamo tecnologie di geolocalizzazione per fornire una mappa in tempo reale delle zone di rumore 
        e quiete.
        Questo permette agli utenti di fare scelte informate su dove andare in base ai livelli di rumore.
        </p>
</div>

<div class="business">
    <p>MODELLO DI BUSINESS<br><br><br>
        huShhh ha un modello di business diversificato e sostenibile, basato su più fonti di reddito per 
        garantire la crescita e il successo a lungo termine.<br>
        Collaboriamo con aziende che desiderano promuovere il loro impegno per la sostenibilità e il benessere 
        urbano.<br>
        Queste partnership possono includere sponsorizzazioni e campagne di marketing congiunte.<br>
        Le aziende partner offrono buoni e premi che gli utenti possono ottenere utilizzando i token
        guadagnati.<br>
        Questo crea un ciclo virtuoso di utilizzo e coinvolgimento.<br>
        HuShhh offre spazi pubblicitari all'interno dell'app per aziende interessate a raggiungere un pubblico 
        sensibile al tema del rumore e del benessere urbano.<br>
        Senza compromettere la privacy degli utenti, i dati aggregati e anonimi sul rumore possono essere 
        venduti a enti di ricerca, università e amministrazioni locali per studi sull'inquinamento acustico.<br>
        Offriamo una versione premium dell’app con funzionalità avanzate e contenuti esclusivi per gli utenti 
        disposti a pagare un abbonamento mensile. (DA DEFINIRE)<br>
        Offriamo una versione premium dell’app con funzionalità avanzate e contenuti esclusivi per gli utenti 
        disposti a pagare un abbonamento mensile.<br>
        Le aziende possono offrire promozioni e sconti personalizzati agli utenti di huShhh, aumentando la
        loro visibilità e fidelizzando i clienti.
        </p>
</div>

<div class="futur">
    <p>IMPLEMENTAZIONI FUTURE<br><br><br>
        Implementazione di funzionalità aggiuntive come notifiche in tempo reale sulle variazioni dei livelli 
        di rumore nelle aree preferite dagli utenti.<br>
        Espansione delle integrazioni API con altre piattaforme di recensioni e prenotazioni, migliorando 
        l'interoperabilità.<br>
        Stabilire partnership con aziende e organizzazioni internazionali per espandere huShhh in nuove città 
        e paesi.<br>
        Introduzione di servizi premium, come mappe avanzate del rumore, report personalizzati e consulenze 
        sul benessere acustico.<br>
        Integrazione con Tecnologie Emergenti
        Esplorazione di tecnologie emergenti come l'Internet delle Cose (IoT) per migliorare il monitoraggio 
        del rumore in tempo reale.<br>
        Implementazione di algoritmi di analisi predittiva per anticipare i cambiamenti nei livelli di rumore
        e suggerire proattivamente alternative agli utenti.<br>
        Creazione di una community di utenti che condividano esperienze e suggerimenti, aumentando 
        l'engagement e la fidelizzazione.<br>
    </p>
</div>

<div class="impatto">
    <p>IMPATTO SOCIALE ED EDUCATIVO<br><br><br>
        HuShhh non solo migliora la qualità della vita urbana, ma educa anche le persone sull'importanza della gestione del rumore per il benessere.<br>
        Lanceremo campagne di sensibilizzazione sull'inquinamento acustico, collaborando con scuole, università e organizzazioni comunitarie.<br>
        Creeremo materiale educativo, come articoli, video e infografiche, per informare il pubblico sui 
        benefici di ridurre l'inquinamento acustico.<br>
        Lavoreremo con amministrazioni locali per promuovere politiche di riduzione del rumore e migliorare la 
        qualità della vita nelle città.
    </p>
</div>

<style>
	:global(body), :global(html) {
		margin: 0;
		padding: 0;
		overflow: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.title {
		color: rgb(197, 112, 197);
		font-size: calc(1em + 1vw);
		font-family: Arial, sans-serif;
		text-align: center;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		z-index: 2;
		animation: fadeIn 4s ease-out forwards;
	}

    .intro , .technologie, .business, .futur , .impatto {
        opacity:1;
        transition: opacity 0.4s, display 0s 0.2s;
        font-size: 1em;
        font-family: Arial, sans-serif;
        text-align: center;
        padding-left: 25%;
        padding-right: 25%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        z-index: 2;
        color: rgb(197, 112, 197);
    }

    @media (max-width: 1200px) {
        .intro, .technologie, .business, .futur, .impatto {
            padding: 0 15%;
        }
    }

    @media (max-width: 768px) {
        .intro, .technologie, .business, .futur, .impatto {
            padding: 0 10%;
            font-size: 0.9em;
        }
    }

    @media (max-width: 480px) {
        .intro, .technologie, .business, .futur, .impatto {
            padding: 0 5%;
            font-size: 0.8em;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
</style>