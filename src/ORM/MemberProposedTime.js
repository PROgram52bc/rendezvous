const { Model } = require('objection');

class MemberProposedTime extends Model {
	static get tableName() {
		return 'member_proposed_time';
	}
	static get relationMappings() {
		return {
			members: {
				relation: Model.BelongsToOneRelation,
				modelClass: require('./Members'),
				join: {
					from: 'member_proposed_time.m_id',
					to: 'members.m_id'
				}
			},
			proposed_times: {
				relation: Model.BelongsToOneRelation,
				modelClass: require('./ProposedTimes'),
				join: {
					from: 'member_proposed_time.ts_id',
					to: 'proposed_times.pt_id'
				}
			}
		};
	}
}

module.exports = MemberProposedTime;