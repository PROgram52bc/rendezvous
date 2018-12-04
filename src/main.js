// importing vue components
import Login from './views/Login.vue';
import Teams from './views/Teams.vue';


// registering vue router
import VueRouter from 'vue-router';
const routes = [ 
	{ name: 'login', path: '/', component: Login },
	{ name: 'teams', path: '/teams', component: Teams },
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
	}
})
