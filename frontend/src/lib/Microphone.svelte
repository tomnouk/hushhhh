<script>
	import { onDestroy, onMount } from 'svelte';
	import { geolocation } from '../store';
    import Geolocation from '$lib/Geolocation.svelte';
    import { tokens } from '../store';

	let stream;
	let mediaRecorder;
	let chunks = [];
  
	let values = new Array();
    const DELTA_TIME = 3000;

    // Funzione per calcolare il livello RMS (Root Mean Square) per stima db
    function calculateRMS(samples) {
        let sum = 0;
        for (let i = 0; i < samples.length; i++) {
            sum += samples[i] * samples[i];
        }
        return Math.sqrt(sum / samples.length);
    }

    const interval = setInterval(
        async () => {
			if (values.length == 0) {
				return ;
			}
            // prendo le coordinate
            let sum = 0;
            for (let i = 0; i < values.length; i++) {
                sum += values[i];
            };
            sum = sum / values.length;
			console.log(sum)
            // manda a backend in database intensita' media + database
            // backend aggiorna db
            $tokens = $tokens + 1;
            const response = await fetch('http://localhost:8080/audio/store', {
				method: 'POST',
				body: JSON.stringify({'mag': sum, 'lat': 43.77, 'long': 11.26}),
				headers: {'Content-Type': 'application/json'}
			})
            
            // azzero array
            values = new Array();
            },
            DELTA_TIME // time
        )
	
	const requestMicrophone = async () => {
	   navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(stream => {
			mediaRecorder = new MediaRecorder(stream);
            const audioContext = new window.AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
            analyser.smoothingTimeConstant = 0.8;
            // fast fourier transform, per determinare il dominio delle frequenze
            analyser.fftSize = 1024;
            microphone.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);
            scriptProcessor.onaudioprocess = function (event) {
                const array = new Float32Array(analyser.fftSize);
                analyser.getFloatTimeDomainData(array);
                const rms = calculateRMS(array);
				let intensity;
                if (rms === 0) intensity = 0;
                else intensity = 20 * Math.log10(rms) + 60;
                values.push(intensity);
            };
        })
        .catch(error => {
            console.error('Errore nell\'accesso al microfono:', error);
        });
	  }

	const stopMicrophone = async () => {
		console.log('stop media');
	  if (mediaRecorder) {
		mediaRecorder.stop();
	  }
	  clearInterval(interval);
	};
  
	$: requestMicrophone();
  
	onDestroy(() => {
	  stopMicrophone();
	  clearInterval(interval);
	});
  </script>
<Geolocation />