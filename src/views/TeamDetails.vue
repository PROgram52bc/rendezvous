<template>
	<div class="section">
		<div class="container">
			<nav class="level">
				<div class="level-left">
					<div class="level-item">
						<p class="title">{{teamInfo.name}}</p>
					</div>
				</div>
				<div class="level-right">
					<div class="level-item">
						<button v-if="!joined" class="button is-primary" v-on:click="handleJoin">Join Team</button>
						<button v-else class="button is-danger" v-on:click="handleLeave">Leave Team</button>
					</div>
				</div>
			</nav>
			<p class="subtitle">Team ID: {{$route.params.id}}</p>
			<p class="subtitle">User ID: {{$root.currentUserId}}</p>
			<p class="subtitle">Joined: {{joined}}</p>
			<div class="level"> <p class="level-item title has-text-centered">Members</p> </div>
			<p class="subtitle" v-for="member in teamInfo.members">{{member.m_id}}: {{member.firstname}}</p>

		</div>
	</div>
</template>
<script>
const axios = require('axios');
export default {
	methods: {
		handleJoin() {
			axios.post(`/members/${this.$root.currentUserId}/teams/${this.$route.params.id}`)
				.then((response)=>{
					// success
					console.log(response);
					this.joined=true;
				}).catch((err)=>{
					console.log(err.response.data.message);
				})
		},
		handleLeave() {
			axios.delete(`/members/${this.$root.currentUserId}/teams/${this.$route.params.id}`)
				.then((response)=>{
					// success
					console.log("succeeded")
					console.log(response);
					this.joined=false;
				}).catch((err)=>{
					console.log("failed")
					console.log(err);
				})

		}
	},
	data: function() { return {
		teamInfo: {},
		joined: -1, // something other than true or false
	}},
	created: async function() {
		let rawTeam = await axios.get(`/teams/${this.$route.params.id}`);
		this.teamInfo = rawTeam.data[0];
		console.log(this.teamInfo);
	},
	watch: {
		teamInfo: function() {
			if (!this.teamInfo)
				return null;
			let members = this.teamInfo.members;
			for (let i=0; i<members.length; i++) {
				if (members[i].m_id == this.$root.currentUserId) {
					this.joined = true;
					return;
				}
			}
			this.joined = false;
		}
	}

}
</script>
