<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../../store';

	let username: string;
	let password: string;
	
	async function login() {
		const response: Response = await fetch('http://localhost:8080/auth/login', {
			method: 'POST',
			body: JSON.stringify({'email': username, 'password': password}),
			headers: {'Content-Type': 'application/json'},
		})
		console.log(response.status)
		if (response.status == 200) {
			const obj = await response.json();
			$user = obj;
			console.log($user)
			window.location.assign('/')
		}
	}

	async function signup() {
		const response = await fetch('http://localhost:8080/auth/signup', {
			method: 'POST',
			body: JSON.stringify({'email': username, 'password': password}),
			headers: { 'Content-Type': 'application/json'}
		})
		if (response.ok) {
			const obj = await response.json();
			$user = obj;
			return window.location.assign('/');
		}
	}
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
		max-width: 400px;
		width: 100%;
		margin: auto;
		padding: 20px;
		box-shadow: 0 4px 6px rgba(0,0,0,0.1);
		border-radius: 8px;
	}

	@media (max-width: 600px) {
		.card {
			margin: 0;
			padding: 10px;
		}
	}
  
	button {
		margin-top: 10px;
		width: 100%;
		padding: 10px;
		background-color: #096411;
		color: rgb(6, 53, 8);
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #0cad37;
	}

	.input {
		width: 100%;
		padding: 10px;
		margin-bottom: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.label {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}
</style>

<div class="container">	
	<div class="card">
		<label class="label">
			<input
				class="input"
				type="text"
				bind:value="{username}"
				name="username"
				placeholder="Enter your Username" required
			/>
		</label>
	
		<label class="label">
			<input
				class="input"
				type="password"
				bind:value="{password}"
				name="password"
				placeholder="Enter your Password" required
			/>
		</label>
	
		<div>
			<button
				type="button"
				on:click|preventDefault={login}
			>Login</button>
			<button
				type="button"
				on:click|preventDefault={signup}
			>Signup</button>
		</div>
	</div>
</div>
  
