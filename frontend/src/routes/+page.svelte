<script>
    import { onMount } from 'svelte';
    import Map from '$lib/Map.svelte';
    import { writable } from 'svelte/store';

    let ready = false;
    let scrollY = 0;
    let mapKey = writable(Date.now()); // Utiliser une clé dynamique pour forcer le rechargement du composant Map

    onMount(() => {
        ready = true;

        const updatePage = () => {
            scrollY = window.scrollY;
            calculateColor(scrollY);
            const trans = document.querySelector('.trans');
            const newOpacity = 1 - scrollY / 800;
            trans.style.opacity = Math.max(0, Math.min(1, newOpacity));
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

    function refreshMap() {
        mapKey.set(Date.now()); // Change la clé pour forcer le rechargement du composant Map
    }
</script>

<div class="trans">
    <p>Be Aware of Your Surrounding</p>
</div>
<div class="map-container">
    {#key $mapKey}
        <Map />
    {/key}
</div>
<div class="refresh-button-container">
    <button on:click={refreshMap} class="refresh-button">Refresh Map</button>
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

    .trans {
        opacity:1;
        transition: opacity 0.2s, display 0s 0.2s;
        color: rgb(197, 112, 197);
        font-size: calc(1em + 1vw);
        font-family: Arial, sans-serif;
        text-align: center;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        z-index: 2;
    }

    .map-container {
        width: 100%;
        margin-top: 0vh;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
        z-index: 1;
        padding-bottom: 10vh; /* Ajuster cette valeur si nécessaire */
    }

    .refresh-button-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 50px;
    }

    .refresh-button {
        padding: 10px 20px;
        font-size: 1em;
        color: rgb(2, 40, 2);
        background-color: rgb(17, 99, 27);
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .refresh-button:hover {
        background-color: rgb(13, 65, 25);
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>