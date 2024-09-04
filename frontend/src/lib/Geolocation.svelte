<script>
	import { onDestroy } from 'svelte';
	import { geolocation, updateGeolocation } from '../store';
	let watchId;
  
	const requestGeolocation = () => {
	  if (navigator.geolocation) {
		watchId = navigator.geolocation.watchPosition(
		  pos => {
			updateGeolocation(pos.coords);
		  },
		  error => {
			console.error("Error Code = " + error.code + " - " + error.message);
		  }
		);
	  } else {
		console.log("Geolocation is not supported by this browser.");
	  }
	};
  
	const stopGeolocation = () => {
	  if (watchId != null) {
		navigator.geolocation.clearWatch(watchId);
	  }
	};
  
	$: requestGeolocation();
  
	onDestroy(() => {
	  stopGeolocation();
	});
  </script>
  