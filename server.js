// A controller that provides the API

/*
// connecting database
const knex = require('knex')({
	client: 'pg',
    connection: {
        host: "faraday.cse.taylor.edu",
        database: "",
		user: "",
		password: ""
    }
});
*/

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
	/* New route template
	{
		method: "",
		path: "",
		config: {
			description: ""
		}
		handler: async (request, h) => {
			return 0;
		}
	}
	*/
]);

async function init() {
	try {
		await server.start();
	}
	catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log(`Server running at: ${server.info.uri}`);
}

init();
