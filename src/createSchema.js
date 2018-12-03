const knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'faraday.cse.taylor.edu',
		database: 'david_deng',
		user: 'david_deng',
		password: 'wowaqufa'
	},
});

async function generateSchema() {
	let tableExists = null;
	/****************** creating table members ************************/
	tableExists = await knex.schema.hasTable('members');
	if (tableExists) {
		// await knex.schema.dropTable('members');
		await knex.raw('DROP TABLE members CASCADE'); // prevent foreign key constraint
		console.log(`table members exists, dropping the table...`);
	}
	await knex.schema.createTable('members', table => {
		table.increments('m_id');
		table.string('email');
		table.string('password');
		table.string('firstname');
		table.string('lastname');
	});
	console.log(`table members created`);

	/****************** creating table core_hours ************************/
	tableExists = await knex.schema.hasTable('core_hours');
	if (tableExists) {
		await knex.schema.dropTable('core_hours');
		console.log(`table core_hours exists, dropping the table...`);
	}
	await knex.schema.createTable('core_hours', table => {
		table.increments('ch_id');
		table.integer('m_id');
		table.integer('weekday'); // 0-6
		table.time('start_time');
		table.time('end_time');
		table.foreign('m_id').references('m_id').inTable('users');
	});
	console.log(`table core_hours created`);

	/****************** creating table commitments ************************/
	tableExists = await knex.schema.hasTable('commitments');
	if (tableExists) {
		await knex.schema.dropTable('commitments');
		console.log(`table commitments exists, dropping the table...`);
	}
	await knex.schema.createTable('commitments', table => {
		table.increments('c_id');
		table.integer('m_id');
		table.timestamp('start_time', true); // no timezone
		table.timestamp('end_time', true); // no timezone
		table.enu('repeat_unit', ['D','W','M','Y']);
		table.date('terminate_date');
		table.foreign('m_id').references('m_id').inTable('users');
	});
	console.log(`table commitments created`);

	/****************** creating table teams ************************/
	tableExists = await knex.schema.hasTable('teams');
	if (tableExists) {
		// await knex.schema.dropTable('teams');
		await knex.raw('DROP TABLE teams CASCADE'); // prevent foreign key constraint
		console.log(`table teams exists, dropping the table...`);
	}
	await knex.schema.createTable('teams', table => {
		table.increments('t_id');
		table.string('name');
	});
	console.log(`table teams created`);

	/****************** creating table member_team ************************/
	tableExists = await knex.schema.hasTable('member_team');
	if (tableExists) {
		await knex.schema.dropTable('member_team');
		console.log(`table member_team exists, dropping the table...`);
	}
	await knex.schema.createTable('member_team', table => {
		table.integer('m_id');
		table.integer('t_id');
		table.foreign('m_id').references('m_id').inTable('members');
		table.foreign('t_id').references('t_id').inTable('teams');
	});
	console.log(`table member_team created`);

	/****************** creating table activities ************************/
	// fixme: Tables below were not in correct relationships
	tableExists = await knex.schema.hasTable('activities');
	if (tableExists) {
		await knex.schema.dropTable('activities');
		console.log(`table activities exists, dropping the table...`);
	}
	await knex.schema.createTable('activities', table => {
		table.increments('m_id');
		table.string('email');
		table.string('password');
		table.string('firstname');
		table.string('lastname');
	});
	console.log(`table activities created`);

	/****************** creating table proposed_times ************************/
	tableExists = await knex.schema.hasTable('proposed_times');
	if (tableExists) {
		await knex.schema.dropTable('proposed_times');
		console.log(`table proposed_times exists, dropping the table...`);
	}
	await knex.schema.createTable('proposed_times', table => {
		table.increments('m_id');
		table.string('email');
		table.string('password');
		table.string('firstname');
		table.string('lastname');
	});
	console.log(`table proposed_times created`);

	/****************** creating table member_proposed_times ************************/
	tableExists = await knex.schema.hasTable('member_proposed_times');
	if (tableExists) {
		await knex.schema.dropTable('member_proposed_times');
		console.log(`table member_proposed_times exists, dropping the table...`);
	}
	await knex.schema.createTable('member_proposed_times', table => {
		table.increments('m_id');
		table.string('email');
		table.string('password');
		table.string('firstname');
		table.string('lastname');
	});
	console.log(`table member_proposed_times created`);
}

async function insert() {
	// insert a bunch of members
	await knex('members').insert(
		[
			{
				m_id: 1,
				email: "alice@taylor.edu",
				password: "pw",
				firstname: "fn",
				lastname: "ln"
			},
			{
				m_id: 2,
				email: "bob@taylor.edu",
				password: "pw",
				firstname: "bob",
				lastname: "ln"
			},
			{
				m_id: 3,
				email: "charlie@taylor.edu",
				password: "pw",
				firstname: "charlie",
				lastname: "ln"
			},
			{
				m_id: 4,
				email: "david@taylor.edu",
				password: "pw",
				firstname: "david",
				lastname: "ln"
			},
			{
				m_id: 5,
				email: "eve@taylor.edu",
				password: "pw",
				firstname: "eve",
				lastname: "ln"
			},
		]
	);
	// insert a bunch of teams
	await knex('teams').insert(
		[
			{
				t_id: 1,
				name: 'Team Alpha'
			},
			{
				t_id: 2,
				name: 'Team Beta'
			},
		]
	);
	// relations between team and members
	await knex('member_team').insert(
		[
			{
				t_id: 1,
				m_id: 1
			},
			{
				t_id: 1,
				m_id: 2
			},
			{
				t_id: 1,
				m_id: 3
			},
			{
				t_id: 2,
				m_id: 1
			},
			{
				t_id: 1,
				m_id: 4
			},
		]
	);
}


async function query(tableName) {
	let query = await knex.select("*").from(tableName);
	console.log(query);
}



async function init() 
{
	await generateSchema();
	await insert();
	await query('members');
	await query('teams');
	await query('member_team');
	knex.destroy();
}
init();
