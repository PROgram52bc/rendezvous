const { Model } = require('objection');

class MemberTeam extends Model {
	static get tableName() {
		return 'member_team';
	}
	static get relationMappings() {
		return {
			members: {
				relation: Model.BelongsToOneRelation,
				modelClass: require('./Members'),
				join: {
					from: 'member_team.m_id',
					to: 'members.m_id'
				}
			},
			teams: {
				relation: Model.BelongsToOneRelation,
				modelClass: require('./Teams'),
				join: {
					from: 'member_team.t_id',
					to: 'teams.t_id'
				}
			},
			activities: {
				relation: Model.HasManyRelation,
				modelClass: require('./Activities'),
				join: {
					from: 'member_team.m_id',
					to: 'activities.creator_id'
				}
			}
		};
	}
}

module.exports = MemberTeam;