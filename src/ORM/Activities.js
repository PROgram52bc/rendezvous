const { Model } = require('objection');

class Activities extends Model {
	static get tableName() {
		return 'activities';
	}
	static get relationMappings() {
		return {
			member_team: {
				relation: Model.BelongsToOneRelation,
				modelClass: require('./MemberTeam'),
				join: {
					from: 'activities.creator_id',
					to: 'member_team.m_id'
				}
			},
			teams: {
				relation: Model.BelongsToOneRelation,
				modelClass: require('./Teams'),
				join: {
					from: 'activities.t_id',
					to: 'team.t_id'
				}
			},
			proposed_times: {
				relation: Model.HasManyRelation,
				modelClass: require('./ProposedTimes'),
				join: {
					from: 'activities.a_id',
					to: 'proposed_times.a_id'
				}
			}
		};
	}
}

module.exports = Activities;
