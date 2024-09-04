<script>
	import {onDestroy, setContext } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { geolocation } from '../store';
	import Geolocation from '$lib/Geolocation.svelte'
	import { json, geoMercator, geoPath, zoomIdentity } from 'd3';

	export let width;
	export let height;
	export let transform;
	export let hoveredColorId;
	export let hide = false;
	export let contextName = 'canvas';

	const drawFunctions = [];
	const tTransform = tweened(transform, { duration: 400, easing: cubicInOut });

	let canvas;
	let ctx;
	let pendingInvalidation = false;
	let frameId;
	let devicePixelRatio = 1;

	function scaleCanvas(canvas, ctx, width, height) {
		devicePixelRatio = window.devicePixelRatio || 1;

		canvas.width = width * devicePixelRatio;
		canvas.height = height * devicePixelRatio;
		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';

		ctx.scale(devicePixelRatio, devicePixelRatio);
	}

	function update() {
		if (!ctx) return;

		ctx.clearRect(0, 0, width, height);

		drawFunctions.forEach((fn) => {
			ctx.save();
			ctx.translate($tTransform.x, $tTransform.y);
			ctx.scale($tTransform.k, $tTransform.k);
			fn(ctx);
			ctx.restore();
		});

		pendingInvalidation = false;
	}

	function handleMouseMove(e) {
		const { layerX: x, layerY: y } = e;
		const { data } = ctx.getImageData(x * devicePixelRatio, y * devicePixelRatio, 1, 1);
		const [r, g, b] = data;
		if (r + g + b === 0) {
			hoveredColorId = undefined;
		} else {
			hoveredColorId = `rgb(${r},${g},${b})`;
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d', { willReadFrequently: true });
		// scaleCanvas(canvas, ctx, width, height);
		// frameId = requestAnimationFrame(update);
	});
	
	onDestroy(() => {
		if (frameId) {
			cancelAnimationFrame(frameId);
		}
	});
	
	function invalidate() {
		if (pendingInvalidation) return;
		pendingInvalidation = true;
		frameId = requestAnimationFrame(update);
	}
	
	$: setContext(contextName, {
		register(fn) {
			drawFunctions.push(fn);
		},
		deregister(fn) {
			drawFunctions.splice(drawFunctions.indexOf(fn), 1);
		},
		invalidate,
	});
	
	
	// drawGeoPoint(11.25, 43.77, projection);
	$: if (canvas && ctx) scaleCanvas(canvas, ctx, width, height);

	$: tTransform.set(transform);
	$: if ($tTransform) invalidate();
</script>

<slot></slot>

<canvas
	class:hide
	bind:this={canvas}
	on:mousemove={handleMouseMove}
/>

<style>
	canvas {
		position: var(--position, relative);
		top: 0;
		left: 0;
	}

	canvas.hide {
		opacity: 0.0;
	}
</style>
