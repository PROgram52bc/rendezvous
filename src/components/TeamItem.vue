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
export default {
	props: { 
		team: {
			required: true
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
			// axios.post()
			// if succeeded
			this.joined = true;
		}
	}
}
</script>
