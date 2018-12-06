<template>
	<div class="level">
		<div class="level-left">
			<div class="level-item">
				<p>{{team.name}}</p>
			</div>
		</div>
		<div class="level-right">
			<div class="level-right">
				<button class="button is-success" v-if="!joined" v-on:click="joinTeam()">
					Join
				</button>
			</div>
		</div>
	</div>
</template>
<script>
const axios = require('axios');
export default {
	props: { 
		team: {
			/*
			name: String,
			id: Number,
			joined: boolean
			*/
		}
	},
	data: function () {
		return {
			joined: this.team.joined
		}
	},
	methods: {
		joinTeam() {
			console.log("Join Team called");
			console.log(`Team id to join: ${this.team.id}`)
			console.log(`Member id : ${this.$root.currentUserId}`)
			console.log(`Joined: ${this.joined}`)
			axios.post(`/members/${this.$root.currentUserId}/teams/${this.team.id}`);
			// if succeeded
			this.joined = true;
		}
	}
}
</script>
