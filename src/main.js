// importing vue components
import Login from './views/Login.vue';
import Teams from './views/Teams.vue';
import Commitments from './views/Commitments.vue';
import CourHours from './views/CourHours.vue';
import TeamDetails from './views/TeamDetails.vue'


// registering vue router
import VueRouter from 'vue-router';
const routes = [ 
	{ name: 'login', path: '/', component: Login },
	{ name: 'teams', path: '/teams', component: Teams },
	{ name: 'commitments', path: '/commitments', component: Commitments },
	{ name: 'cour-hours', path: '/cour-hours', component: CourHours },
	{ name: 'team-details', path: '/team/:id', component: TeamDetails },
	// template
	// { name: 'login', path: '/', component: Login },
]
const router = new VueRouter({
	mode: "history",
	routes
})

Vue.use(VueRouter);

// import bulma
import 'bulma/css/bulma.css';


// registering vue
import Vue from 'vue';
import App from './App';

new Vue({
	router,
	el: '#app',
	render: (h)=>h(App),
	data: {
		currentUserId: null,
	},
	watch: {
		$route (to, from) {
			console.log(`changing route to: ${to}`)
			console.log(to)
			if (to.name !== 'login' && this.currentUserId == null) {
				console.log("Log in first, please");
				this.$router.push({name: 'login'});
			}
		}
	}
})
