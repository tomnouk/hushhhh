<script>
	import { json, geoMercator, geoPath, zoomIdentity } from 'd3';
	import Zoom from '$lib/Zoom.svelte';
	import Count from '$lib/Count.svelte';
	import ConicGradient from '$lib/ConicGradient.svelte';
	import { genColor } from '$lib/color';
	import { onMount, onDestroy } from 'svelte';
	import { geolocation } from '../store';
	import Geolocation from '$lib/Geolocation.svelte'
	
	let width, height;
	let hoveredColor;
	let clickedCounty;
	let transform = zoomIdentity;
	let geojson;
	let counties = [];
	let hoveredCounty;
	let singleCount = [];
	let projection;
	let pathGenerator;
	let interval;
	let refresh_int;
	let multi_count = [];
	const geojsonPath = 'https://raw.githubusercontent.com/tomnouk/coordjson/main/cstoriconobin.geojson';

    const conicStops = [
        { color: 'transparent', start: 0, end: 25 },
        { color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
    ];

	onMount(async () => {
		interval = setInterval(() => {
			if (!$geolocation || !pathGenerator) { return ;}
			let myFeature = [{'geometry': {"coordinates": [$geolocation.longitude, $geolocation.latitude], "type": "Point"}, "type": "Feature", "properties": {"id": null}}]
		    singleCount = myFeature.map(feature => ({
		      ...feature,
		      path: pathGenerator(feature),
		      colorId: genColor(),
		      bounds: pathGenerator.bounds(feature),
		    }));
		}, 1000);
		refresh_int = setInterval(() => {
			if (!$geolocation || !pathGenerator) { return ;}
			get_logs();
		}, 10000)
	})

	onDestroy(() => {
		clearInterval(interval)
		clearInterval(refresh_int)
	})
  
	async function updateCounties() {
		const r = await json(geojsonPath)
	  	geojson = r;
	    if (geojson) {
		    projection = geoMercator().fitSize([width, height], geojson);
		    pathGenerator = geoPath(projection);
			// geojson.features.push(myFeature)
			counties = geojson.features.map(feature => ({
		      ...feature,
		      path: pathGenerator(feature),
		      colorId: genColor(),
		      bounds: pathGenerator.bounds(feature),
		    }));
	    }
		// console.log(counties)
		return counties;
	}
  
	async function get_logs() {
		const response = await fetch('http://localhost:8080/audio/get', {
			method: 'GET'
		})
		if (response.ok) {
			const obj = await response.json();
			let myFeatures = [];
			for (let i = 0; i < obj.length; i++){
				const data = await obj[i];
				myFeatures.push({'magnitude': data.magnitude, 'geometry': {"coordinates": [data.longitude, data.latitude], "type": "Point"}, "type": "Feature", "properties": {"id": null}})
			}
		    multi_count = myFeatures.map(feature => ({
		      	...feature,
		      	path: pathGenerator(feature),
		      	colorId: genColor(),
		      	bounds: pathGenerator.bounds(feature),
		    }));
		}
	}

	function handleClick() {
	  clickedCounty = hoveredCounty;
	  updateTransform();
	}
  
	function updateTransform() {
	  if (clickedCounty) {
		const [[x0, y0], [x1, y1]] = clickedCounty.bounds;
		transform = zoomIdentity
		  .translate(width / 2, height / 2)
		  .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
		  .translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
	  } else {
		transform = zoomIdentity;
	  }
	}
  
	function handleKeydown(e) {
	  if (e.key === ' ') {
		clickedCounty = undefined;
		updateTransform();
	  }
	}

	$: hoveredCounty = counties.find((c) => c.colorId === hoveredColor);
  </script>
  <Geolocation />
  <svelte:window on:keydown={handleKeydown}/>
  
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <main bind:clientWidth={width} bind:clientHeight={height} on:click={handleClick}>
	  {#await updateCounties()}
	  <div class="flex items-center justify-center h-64">
	  	<ConicGradient stops={conicStops} spin>Loading</ConicGradient>
		</div>
	  {:then test}
	
	<Zoom {width} {height} {transform} bind:hoveredColorId={hoveredColor}>
	  {#each counties as {path}}
		<Count path={path} fill="green" opacity={hoveredCounty && hoveredCounty.path === path ? 1.0 : 0.5}/>
	  {/each}
	  {#each singleCount as {path}}
	  <Count path={path} fill="red" opacity={hoveredCounty && hoveredCounty.path === path ? 1.0 : 0.5}/>
	  {/each}
	  {#each multi_count as {path, magnitude}}
		  <Count path={path} fill="violet" opacity={(1 / 130) * magnitude}/>
	  {/each}
	</Zoom>
	<Zoom {width} {height} {transform} bind:hoveredColorId={hoveredColor} hide --position="absolute">
	  {#each counties as {path, colorId}}
		<Count path={path} fill={colorId} stroke="#FFFFFF" opacity={1.0}/>
	  {/each}
	</Zoom>
	{/await}
  </main>
  <style>
	main {
	  width: 100vw;
	  height: 100vh;
	  cursor: pointer;
	  overflow: hidden;
	}
  </style>