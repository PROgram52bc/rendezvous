<template>
	<div>
		<team-item v-for="team in teams"
			 v-bind:key="team.id"
			 v-bind:team="team">
		</team-item>
	</div>

</template>
<script>
import TeamItem from "./TeamItem.vue"
const axios = require('axios');
export default {
	data: function() { return { 
		teams: []
	}},
	mounted: async function() {
		let rawTeams = await axios.get(`/members/${this.$root.currentUserId}/teams`);
		rawTeams.data.forEach((team)=>{
			this.teams.push({
				name: team.name,
				id: team.t_id,
				joined: true
			})
		})
	},
	components: { TeamItem }
}
</script>
