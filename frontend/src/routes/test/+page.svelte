TEEEEST
<!-- 
<div class="mx-96 my-36 px-32">
	<div class="card p-4">
	<label class="label">
	  <input
	  class="input text-center"
	  type="text"
	  bind:value="{username}"
	  name="username"
	  placeholder="Enter your Username" required
	  data-np-uid="prova"/>
	</label>
  
	<label class="label">
	  <input
	  class="input text-center"
	  type="password"
	  bind:value="{password}"
	  name="password"
	  placeholder="Enter your Password" required
	  data-np-uid="prova"/>
	</label>
	<div>
		<button
		type="button"
		style="width: 100%;"
		class="btn variant-filled" on:click|preventDefault={login}>Login</button>
        <button
		type="button"
		style="width: 100%;"
		class="btn variant-filled" on:click|preventDefault={signup}>Signup</button>
	    </div>
	</div>
</div> -->
  
<script lang="ts">
import { onMount } from 'svelte';
import { user } from '../../store';
import logo from '$lib/logo.png'
import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

let username: string;
let password: string;
let currentTile : number = 0;
  
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
  
onMount(async () => {
	// const response = await fetch('http://localhost:8080/user/find')
})
  
</script>