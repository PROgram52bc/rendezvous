<template>
	<div>
		<div class="column"></div>
		<div class="tabs is-centered is-toggle">
			<ul>
				<li v-for="(item, key) in componentList" 
		v-bind:class="item.active ? 'is-active' : null"
		v-on:click="switchTab(item)"><a>{{item.label}}</a></li>
			</ul>
		</div>
		<div class="column is-6 is-offset-3">
			<div class="box">
				<component v-bind:is="currentComponent"></component>
			</div>
		</div>
	</div>
</template>
<script>
import MyTeams from '../components/MyTeams.vue';
import AllTeams from '../components/AllTeams.vue';
import CreateTeam from '../components/CreateTeam.vue';
export default {
	created: function() {
		if (!this.$root.currentUserId) this.$router.push('/');
	},
	data: function() { return {
		currentComponent: MyTeams,
		componentList: [
			{
				name: 'MyTeams',
				label: 'My Teams',
				active: true,
			},
			{
				name: 'AllTeams',
				label: 'All Teams',
				active: false,
			},
			{
				name: 'CreateTeam',
				label: 'Create Team',
				active: false,
			},
		]
	}},
	components: { MyTeams, AllTeams, CreateTeam },
	methods: {
		switchTab(item) {
			this.componentList.forEach((i)=>{
				if (i.name === item.name)
				{
					i.active = true;
					this.currentComponent = i.name;
				}
				else
					i.active = false;

			});

		}
	},
}
</script>
