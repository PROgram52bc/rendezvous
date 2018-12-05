const { Model } = require('objection');

class Teams extends Model {
	static get tableName() {
		return 'teams';
	}
	static get relationMappings() {
		return {
			members: {
				relation: Model.ManyToManyRelation,
				modelClass: require('./Members'),
				join: {
					from: 'teams.t_id',
					through:
					{
						from: 'member_team.t_id',
						to: 'member_team.m_id'
					},
					to: 'members.m_id'
				}
			},
			member_team: {
				relation: Model.HasManyRelation,
				modelClass: require('./MemberTeam'),
				join: {
					from: 'teams.t_id',
					to: 'member_team.t_id'
				}
			},
			activities: {
				relation: Model.HasManyRelation,
				modelClass: require('./Activities'),
				join: {
					from: 'teams.t_id',
					to: 'activities.t_id'
				}
			}
		};
	}
}

module.exports = Teams;
