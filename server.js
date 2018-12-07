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
		path: "/members/{m_id}/core-hours",
		config: {
			description: "Get one member's core-hours",
		},
		handler: async (request, h) => {
			return Corehours
				.query()
				.select("*")
				.where("m_id", request.params.m_id);
		}
	},
	{
		method: "PUT",
		path: "/members/{m_id}/core-hours/{ch_id}",
		config: {
			description: "Change a member's core-hours",
		},
		handler: async (request, h) => {
			return Corehours
				.query()
				.where("ch_id", request.params.ch_id)
				.andWhere("m_id", request.params.m_id)
				.update({
					weekday: request.payload.weekday,
					start_time: request.payload.start_time,
					end_time: request.payload.end_time
				});
		}
	},
	{
		method: "GET",
		path: "/members/{m_id}/teams",
		config: {
			description: "Retrieve all teams that a member has joined"
		},
		handler: async (request, h) => {
			return MemberTeam
				.query()
				.select("*")
				.where("m_id", request.params.m_id)
				.eager('teams')
				.map(obj=>obj.teams); // this is cool...
		}
	},
	{
		method: "GET",
		path: "/teams",
		config: {
			description: "Retrieve all teams that exist"
		},
		handler: async (request, h) => {
			return Teams
				.query()
				.select("*")
		}
	},
	{
		method: "GET",
		path: "/teams/{t_id}",
		config: {
			description: "Retrieve info about a specific team"
		},
		handler: async (request, h) => {
			return Teams
				.query()
				.select("*")
				.where('t_id', request.params.t_id)
				.eager('members');
		}
	},
	{
		method: "POST",
		path: "/members/{m_id}/teams",
		config: {
			description: "Let a member create a team",
		},
		handler: async (request, h) => {
			let result = await Teams.query().where('name', request.payload.name);
			console.log("result")
			console.log(result)
			if (result.length != 0) return Boom.badRequest(`Team '${request.payload.name}' already exists`, 400);
			try {
				let newTeam = await Teams.query()
					.insert({
						name: request.payload.name
					}).returning('*');
				console.log("newTeam");
				console.log(newTeam);
				let t_id = newTeam.t_id;
				await MemberTeam.query()
					.insert({
						m_id: request.params.m_id,
						t_id
					}).returning('*');
//				MemberTeam.query().
//					.insert({
//						t_id:
//					})
				return t_id;
			}
			catch(err){return `Error creating team: ${err.message}`}
		}
	},
	{
		method: "POST",
		path: "/members/{m_id}/teams/{t_id}",
		config: {
			description: "Let a member join a team",
		},
		handler: async (request, h) => {
			let result = await MemberTeam.query()
				.select('*')
				.where('m_id', request.params.m_id)
				.andWhere('t_id', request.params.t_id);
			if (result.length != 0) return Boom.badRequest(`member is already in the team`, 400);
			return await MemberTeam.query()
				.insert({
					m_id: request.params.m_id,
					t_id: request.params.t_id
				}).returning('*');
		}
	},
	{
		method: "DELETE",
		path: "/members/{m_id}/teams/{t_id}",
		config: {
			description: "Remove a member from a team",
		},
		handler: async (request, h) => {
			return await MemberTeam.query()
				.select('*')
				.where('m_id', request.params.m_id)
				.andWhere('t_id', request.params.t_id)
				.del();
		}
	},
	{
		method: "GET",
		path: "/members/{m_id}/commitments",
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
		path: "/members/{m_id}/commitments",
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
		path: "/members/{m_id}/commitments/{c_id}",
		config: {
			description: "Let a member change a commitment",
		},
		handler: async (request, h) => {
			return knex('commitments')
				.select('*')
				.where('m_id', request.params.m_id)
				.andWhere('c_id', request.params.c_id);/*
				.update({
					start_time: request.payload.start_time,
					end_time: request.payload.end_time,
					repeat_unit: request.payload.repeat_unit,
					terminate_date: request.payload.terminate_date
				});*/
		}
	},
	{
		//CHANGE C_ID TO PARAMETER
		method: "DELETE",
		path: "/members/{m_id}/commitments",
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
