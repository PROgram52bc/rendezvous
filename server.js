// A controller that provides the API

// /*
// connecting database
const knex = require('knex')({
	client: 'pg',
    connection: {
        host: "faraday.cse.taylor.edu",
        database: "david_deng",
		user: "david_deng",
		password: "wowaqufa"
    },
	debug: true
});
// */

// setting up ORM
const { Model } = require('objection');
Model.knex(knex);
const Members = require('./src/ORM/Members');
const Teams = require('./src/ORM/Teams');


// setting up server
const Hapi = require('hapi');
const server = Hapi.server({
	host: 'localhost',
	port: 3000
});

// add routes to the server
server.route([
	{
		method: "GET",
		path: "/hello",
		config: {
			description: "a test",
		},
		handler: async (request, h) => {
			return 'hello world';
		}
	},
	{
		method: "GET",
		path: "/members",
		config: {
			description: "retrieve all users"
		},
		handler: async (request, h) => {
			return Members
				.query()
				.select("*");
		}
	},
	{
		method: "GET",
		path: "/members/{m_id}",
		config: {
			description: "Retrieve info about one member"
		},
		handler: async (request, h) => {
			return Members
				.query()
				.select("*")
				.where("m_id", request.params.m_id)
				.eager('teams');
		}
	},
	/*
	{
		method: "GET",
		path: "/members/{m_id}/teams",
		config: {
			description: "Retrieve all teams that a member has joined"
		},
		handler: async (request, h) => {
			return 0;
		}
	},
	*/
	/* New route template
	{
		method: "",
		path: "",
		config: {
			description: ""
		},
		handler: async (request, h) => {
			return 0;
		}
	},
	*/
	/* New route template
	{
		method: "",
		path: "",
		config: {
			description: ""
		},
		handler: async (request, h) => {
			return 0;
		}
	},
	*/
]);

async function init() {
	// Configure plug-ins.
    await server.register([
        require('vision'),
        require('inert'),
        require('lout')
    ]);
	try {
		await server.start();
	}
	catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log(`Server running at: ${server.info.uri}`);
	console.log(`Route documentation available at ${server.info.uri}/docs`);
}

init();
