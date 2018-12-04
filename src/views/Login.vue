<template>
	<div class="column is-6 is-offset-3">
		<div v-if="this.$root.currentUserId == null">
			<div class="notification">{{message}}</div>
			<form>
				<form-field v-model="email" label="Email Address" type="text" name="email" placeholder="Enter your email"></form-field>
				<form-field v-model="password" label="Password" type="password" name="password" placeholder="Enter your password"></form-field>
				<button class="button is-primary" type="submit" v-on:click.prevent="login" v-bind:disabled="email=='' || password==''">Login</button>
			</form>
		</div>
		<p v-else>Welcome, {{userinfo.firstname}} {{userinfo.lastname}} </p>
	</div>

</template>

<script>
import FormField from '../components/FormField.vue'
// import axios
const axios = require('axios');
export default {
	data() { return {
		email: "",
		password: "",
		message: 'Please first log in',
		userinfo: {}
	}},
	components: {
		FormField
	},
	methods: {
		getUserInfo: async function(id){
			try {
				console.log(id);
				let result = await axios.get(`/members/1`);
				this.userinfo = result.data[0];
			}
			catch(err) {
				console.log(`Failed to get userinfo: ${err}`);
			}
		},
		login: async function() {
			try {
				let { data } = await axios.post('/login', {
					email: this.email,
					password: this.password
				});
				this.$root.currentUserId = data;
			}
			catch(err) { 
				this.message = err.response.data.message ? err.response.data.message : err;
			}
			this.getUserInfo(this.$root.currentUserId);
		}
	}
}
</script>
