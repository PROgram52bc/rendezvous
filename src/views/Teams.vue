<template>
	<div>
		<div class="tabs is-centered is-toggle">
			<ul>
				<li class="is-active"><a>My Teams</a></li>
				<li><a>All Teams</a></li>
				<li><a>Create Team</a></li>
			</ul>
		</div>
		<div class="box">
			<keep-alive>
				<component v-bind:is="currentComponent" v-bind="currentProperties"></component>
			</keep-alive>
		</div>
	</div>
</template>
<script>
import MyTeams from '../components/MyTeams.vue';
export default {
	data: function() { return {
		currentComponent: MyTeams
	}},
	components: { MyTeams },
	computed: {
		currentProperties: function() {
			if (this.currentComponent === MyTeams) {
				return { 
					teams: [
						{
							name: 'Team Alpha',
							id: '1',
							joined: true
						},
						{
							name: 'Team Beta',
							id: '2',
							joined: false
						},
					]
				}
			}
			else return this.currentComponent;
		}
	}
}
</script>
