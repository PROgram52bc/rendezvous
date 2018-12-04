<template>
	<div>
		<section class="hero is-primary">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">
						Welcome to Rendezvous
					</h1>
					<h2 class="subtitle">
						A COS 243 project
					</h2>
				</div>
			</div>
		</section>
		<nav class="navbar is-light" role="navigation">
			<router-link class="navbar-item is-active" :to="{name: 'login'}">Home</router-link> 
			<router-link class="navbar-item" :to="{name: 'teams'}">My Team</router-link>  
			<!-- Template
	   <router-link>Propose Activity</router-link> | 
	   <router-link>Commitments</router-link> |
	   <router-link>Core Hours</router-link>
			-->
		</nav>
		<router-view></router-view>
		<footer class="footer">
			<div class="content has-text-centered">
				<p>
				<strong>Rendezvous</strong> by David Deng and Nathan Margosian
				</p>
			</div>
		</footer>
	</div>
</template>

