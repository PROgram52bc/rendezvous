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
			<div class="navbar-menu">
				<div class="navbar-start">
					<router-link ref="menu-item" 
				  v-if="$root.currentUserId"
				  v-for="(item, key) in menuItems" 
				  v-bind:key="key"
				  v-bind:to="item.name"
				  v-bind:class="item.active ? 'is-active' : null"
				  v-on:click.native="toggleActive(item.name)"
				  class="navbar-item" 
				  >{{item.label}}</router-link>
					<!--
					<router-link ref="home-button"
				  v-on:click.native="changeRoute('home-button')" 
				  class="navbar-item is-active"
				  :to="{name: 'login'}">Home</router-link>
					<router-link ref="teams-button"
				  v-on:click.native="changeRoute($event.target.ref)" 
				  v-if="$root.currentUserId"
				  class="navbar-item"
				  :to="{name: 'teams'}">My Team</router-link>
					<router-link ref="commitments-button"
				  v-on:click.native="changeRoute($event.target.ref)" 
				  v-if="$root.currentUserId"
				  class="navbar-item"
				  :to="{name: 'commitments'}">Commitments</router-link>
					<router-link ref="cour-hours-button" 
				  v-on:click.native="changeRoute($event.target.ref)" 
				  v-if="$root.currentUserId" 
				  class="navbar-item" 
				  :to="{name: 'cour-hours'}">Core Hours</router-link>
					-->
				</div>
				<div class="navbar-end">
					<a v-if="$root.currentUserId !== null" class="navbar-item" v-on:click="logOut">Log Out</a>
				</div>
			</div>
			<!-- Template
	   <router-link>Propose Activity</router-link> |
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
<script>
export default {
	data: function() { return {
		menuItems: [
			{ 
				name: "login",
				label: "Home",
				active: true,
			},
			{ 
				name: "teams",
				label: "Teams",
				active: false,
			},
			{ 
				name: "commitments",
				label: "Commitments",
				active: false,
			},
			{ 
				name: "cour-hours",
				label: "Core Hours",
				active: false,
			},
		]

	}},
	methods: {
		toggleActive(name) {
			console.log("Changed state to " + name);
			this.menuItems.forEach((i)=>{i.name!=name ? i.active=false : i.active=true;});
		},
		logOut(){
			this.$root.currentUserId=null;
			this.$router.push({name: 'login'});
		}

	}
}
</script>
