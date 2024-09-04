<script lang="ts">
	import '../app.css';
	import '../app.postcss';

	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import logo from '$lib/logo.png'
	import settings_icon from '$lib/Settings_icon.png'
	import mic_icon from '$lib/radio-waves.png'
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import Geolocation from '$lib/Geolocation.svelte';
	import { microphoneEnabled, toggleMicrophone } from '../store';
	import Microphone from '$lib/Microphone.svelte';
	import { tokens } from '../store';

	const popupFeatured: PopupSettings = {
		event: 'click',
		target: 'popupFeatured',
		placement: 'left',
	};

	storePopup.set({
		computePosition,
		autoUpdate,
		flip,
		shift,
		offset,
		arrow
	});

</script>

<AppBar gridColumns="grid-cols-3 space-x-4" slotTrail="place-content-end" background='bg-surface-0-0-token' class="fixed top-0 left-0 w-full z-50">
    <svelte:fragment slot="lead">
        <div class="flex items-center flex-responsive">
            <button on:click={toggleMicrophone} class={$microphoneEnabled ? 'btn variant-ringed mic-button' : 'btn mic-button'}>
                <img src={mic_icon} alt="mic" width="40" class="mr-2"/>
            </button>
            {#if $microphoneEnabled}
                <Microphone />
            {/if}
			<p class="h1">{$tokens}</p>
        </div>
    </svelte:fragment>
    <a href="/" class="flex justify-center items-center">
        <img src={logo} alt="logo" class="click-logo"/>
    </a>
    <svelte:fragment slot="trail">
        <button class="btn" use:popup={popupFeatured}>
            <img src={settings_icon} alt="setting" />
        </button>
        <div class="card p-4 w-40 shadow-xl z-10 items-center text-center content-center justify-items-center" data-popup="popupFeatured">
            <div><a href="/">Home</a></div>
            <div><a href="/login">Login</a></div>
			<div><a href="/profile">Profile</a></div>
			<div><a href="/project">Project</a></div>
            <div><p>Logout</p></div>
			<div class="flex items-center justify-center">
                <LightSwitch />
            </div>
        </div>
    </svelte:fragment>
</AppBar>
<div class="main-content">
	<slot></slot>
</div>

<style>
    .card :hover {
        background-color: #767272;
        cursor: pointer;
    }

	.main-content {
		padding-top: 100px;
	}

	.click-logo:hover {
		cursor: pointer;
	}

	.h1 {
		font-size: 1.5rem;
	}

	.mic-button {
		outline: none;
        box-shadow: none;
	}
	
	@media (max-width: 768px) {
        .flex-responsive {
            flex-direction: column;
            align-items: center;
        }

        .mic-button {
            margin-bottom: 20px;
        }
    }

</style>