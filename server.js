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
const Corehours = require('./src/ORM/Corehours');
const MemberTeam = require('./src/ORM/MemberTeam');
const Commitments = require('./src/ORM/Commitments');
const Activities = require('./src/ORM/Activities');
const MemberProposedTime = require('./src/ORM/MemberProposedTime');
const ProposedTimes = require('./src/ORM/ProposedTimes');

// setting up server
const Joi = require("joi"); 	//Input validation
const Hapi = require('hapi');	//Server
const server = Hapi.server({
	host: 'localhost',
	port: 3000
});

// setting up Boom for error
const Boom = require('boom');

// add routes to the server
server.route([
	{
		method: "POST",
		path: "/login",
		config: {
			description: "Get the userid based on username and password"
		},
		handler: async (request, h) => {
			let rows = await Members.query()
			.where('email', request.payload.email)
			.andWhere('password', request.payload.password)
			if (rows.length == 0)
			{
				throw Boom.badRequest('Email or password incorrect.');
			}
			else
				return rows[0].m_id;
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
	{
		method: "GET",
		path: "/members/core-hours/{m_id}",
		config: {
			description: "Get one member's core-hours",
		},
		handler: async (request, h) => {
			return Corehours.query()
				.select("*")
				.where("m_id", request.params.m_id);
		}
	},
	{
		//NEEDS TO BE EDITED
		method: "PUT",
		path: "/members/core-hours/{m_id}",
		config: {
			description: "Change a member's core-hours",
		},
		handler: async (request, h) => {
			return "core-hours put";
			/*Corehours
				.query()
				.where("ch_id", request.payload.ch_id);
				.update({
					weekday: request.payload.weekday,
					start_time: request.payload.start_time,
					end_time: request.payload.end_time
				});*/
		}
	},
	{
		method: "GET",
		path: "/members/teams/{m_id}",
		config: {
			description: "Retrieve all teams that a member has joined"
		},
		handler: async (request, h) => {
			return MemberTeam
				.query()
				.select("*")
				.where("m_id", request.params.m_id)
				.eager('teams');
		}
	},
	{
		//NEEDS TO BE EDITED
		method: "POST",
		path: "/members/teams/{m_id}",
		config: {
			description: "Let a member join a team",
		},
		handler: async (request, h) => {
			return "teams post";
		}
	},
	{
		//CHANGE T_ID TO PARAMETER
		method: "DELETE",
		path: "/members/teams/{m_id}",
		config: {
			description: "Remove a member from a team",
		},
		handler: async (request, h) => {
			return MemberTeam.query()
				.select('*')
				.where('m_id', request.params.m_id)
				.andWhere('t_id', 2)
				.del();
			 //"teams DELETE";
		}
	},
	{
		method: "GET",
		path: "/members/commitments/{m_id}",
		config: {
			description: "Retrieve all commitments that a member has"
		},
		handler: async (request, h) => {
			return Commitments
				.query()
				.select("*")
				.where("m_id", request.params.m_id);
		}
	},
	{
		//NEEDS TO BE EDITED
		method: "POST",
		path: "/members/commitments/{m_id}",
		config: {
			description: "Let a member create a commitment",
		},
		handler: async (request, h) => {
			return "commitment post";
		}
	},
	{
		//NEEDS HAVE C_ID BE PARAM AND HAVE UPDATE BE EVERYTHING
		method: "PUT",
		path: "/members/commitments/{m_id}",
		config: {
			description: "Let a member change a commitment",
		},
		handler: async (request, h) => {
			return knex('commitments')
				.where('m_id', request.params.m_id)
				.andWhere('c_id', 30)
				.update('repeat_unit', 'W');

			//return 'hey';
			//return "commitment put";
		}
	},
	{
		//CHANGE C_ID TO PARAMETER
		method: "DELETE",
		path: "/members/commitments/{m_id}",
		config: {
			description: "Let a member delete a commitment",
		},
		handler: async (request, h) => {
			return Commitments.query()
				.select('*')
				.where('m_id', request.params.m_id)
				.andWhere('c_id', 20)
				.del();
		}
	}
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
