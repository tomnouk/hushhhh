<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../../store';
	import logo from '$lib/logo.png';
	import { Avatar, AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
  
	onMount(async () => {
		// const response = await fetch('http://localhost:8080/user/find')
	});
</script>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 20px;
	}

	.card {
		box-shadow: 0 4px 6px rgba(0,0,0,0.1);
		border-radius: 8px;
		padding: 20px;
		max-width: 400px;
		width: 100%;
		text-align: center;
	}

	.avatar-link {
		display: inline-block;
		position: relative;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: 0 auto 20px;
		overflow: hidden;
	}

	.avatar-link img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-link::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 2px solid transparent;
		transition: border-color 0.3s ease;
	}

	.info p {
		margin: 10px 0;
		font-size: 16px;
		color: #6b6767;
	}

	@media (max-width: 600px) {
		.card {
			margin: 0 10px;
			padding: 15px;
		}

		.avatar-link {
			width: 80px;
			height: 80px;
		}

		.info p {
			font-size: 14px;
		}
	}
</style>

<div class="container">
	<div class="card">
		<a href="#" class="avatar-link">
			<img src={logo} alt="profile_pic" />
		</a>
		<div class="info">
			<p>Name: Gianni</p>
			<p>Surname: Morandi</p>
			<p>Username: Man1</p>
			<p>Email: gianni5dita@gmail.com</p>
			<p>Hu$hhh: molti</p>
		</div>
	</div>
</div>