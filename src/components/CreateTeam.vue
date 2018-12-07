<template>
	<form>
		<form-field v-model="name" label="Team Name" type="text" name="name" placeholder="Pick a name for your team"></form-field>
		<button class="button is-primary" type="submit" v-on:click.prevent="create" v-bind:disabled="name==''">Create</button>
	</form>
</template>
<script>
const axios = require('axios');
import FormField from './FormField.vue'
export default {
	data: function() { return { 
		name: ""
	}},
	methods: {
		create() {
			axios.post(`/members/${this.$root.currentUserId}/teams`, {
				name: this.name
			}).then((teamId)=>{
				// success
				console.log(teamId);
				this.$router.push({name: 'team-details', params: {id: teamId.data}});
			}).catch((err)=>{
				console.log(err.response.data.message);
			})
		}
	},
	components: { FormField }
}
</script>
