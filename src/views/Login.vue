<template>
	<div class="column is-6 is-offset-3">
		<div v-if="this.$root.currentUserId === null">
			<div class="notification">{{message}}</div>
			<form>
				<form-field v-model="email" label="Email Address" type="text" name="email" placeholder="Enter your email"></form-field>
				<form-field v-model="password" label="Password" type="password" name="password" placeholder="Enter your password"></form-field>
				<button class="button is-primary" type="submit" v-on:click.prevent="handleLogin" v-bind:disabled="email=='' || password==''">Login</button>
			</form>
		</div>
		<div v-else class="section">
			<div class="container">
				<p class="subtitle is-2">
				Welcome! 
				</p>
				<p class="title is-4"><strong>{{userinfo.firstname}} {{userinfo.lastname}}</strong></p>
			</div>
		</div>
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
	created: function() {
		if (this.$root.currentUserId)
			this.getUserInfo(this.$root.currentUserId);
	},
	components: {
		FormField
	},
	watch: {
		'$root.currentUserId': function(newVal, oldVal) {
			if (newVal === null)
			{
				this.message = 'Please first log in';
				this.userinfo = {};
			}
		}
	},
	methods: {
		getUserInfo: async function(id){
			try {
				console.log(id);
				let result = await axios.get(`/members/${id}`);
				this.userinfo = result.data[0];
			}
			catch(err) {
				console.log(`Failed to get userinfo: ${err}`);
			}
		},
		handleLogin: async function() {
			try {
				let { data } = await axios.post('/login', {
					email: this.email,
					password: this.password
				});
				this.$root.currentUserId = data;
			}
			catch(err) { 
				this.message = err.response.data.message;
			}
			this.getUserInfo(this.$root.currentUserId);
		}
	}
}
</script>
