<script>
    export let stops = [];
    export let spin = false;
</script>

<div class="conic-gradient-container">
    <div class="conic-gradient" style="background-image: conic-gradient({stops.map(stop => `${stop.color} ${stop.start}% ${stop.end}%`).join(', ')});"></div>
    <div class="loading-text"><slot></slot></div>
</div>

<style>
    .conic-gradient-container {
        position: relative;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .conic-gradient {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        animation: spin 2s linear infinite;
    }

    .loading-text {
        position: absolute;
        z-index: 1;
        color: rgb(0, 0, 0);
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>