const { Model } = require('objection');

class Members extends Model {
	static get tableName() {
		return 'members';
	}
	static get relationMappings() {
		return {
			teams: {
				relation: Model.ManyToManyRelation,
				modelClass: require('./Teams'),
				join: {
					from: 'members.m_id',
					through: {
						from: 'member_team.m_id',
						to: 'member_team.t_id'
					},
					to: 'teams.t_id'
				}
			},
			core_hours: {
				relation: Model.HasManyRelations,
				modelClass: require('./Corehours'),
				join: {
					from: 'members.m_id',
					to: 'core_hours.m_id'
				}
			},
			commitments: {
				relation: Model.HasManyRelations,
				modelClass: require('./Commitments'),
				join: {
					from: 'members.m_id',
					to: 'commitments.m_id'
				}
			},
			proposed_times: {
				relation: Model.ManyToManyRelation,
				modelClass: require('./ProposedTimes'),
				join: {
					from: 'members.m_id',
					through: {
						from: 'member_proposed_time.m_id',
						to: 'member_proposed_time.ts_id'
					},
					to: 'proposed_times.pt_id'
				}
			},
			member_proposed_time: {
				relation: Model.HasManyRelations,
				modelClass: require('./MemberProposedTime'),
				join: {
					from: 'members.m_id',
					to: 'member_proposed_time.m_id'
				}
			}
		};
	}
}

module.exports = Members;
