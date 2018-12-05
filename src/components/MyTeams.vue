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
export default {
	props: {
		teams: {
			type: Array,
			required: true
		}
	},
	components: { TeamItem }
}
</script>
