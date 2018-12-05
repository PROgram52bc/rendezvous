const { Model } = require('objection');

class ProposedTimes extends Model {
	static get tableName() {
		return 'proposed_times';
	}
	static get relationMappings() {
		return {
			activities: {
				relation: Model.BelongsToOneRelation,
				modelClass: require('./Activities'),
				join: {
					from: 'proposed_times.a_id',
					to: 'activities.a_id'
				}
			},
			member_proposed_time: {
				relation: Model.HasManyRelations,
				modelClass: require('./MemberProposedTimes'),
				join: {
					from: 'proposed_times.pt_id',
					to: 'member_proposed_time.pt_id'
				}
			},
			members: {
				relation: Model.ManyToManyRelation,
				modelClass: require('./Members'),
				join: {
					from: 'proposed_times.pt_id',
					through:
					{
						from: 'member_proposed_time.ts_id',
						to: 'member_proposed_time.m_id'
					},
					to: 'members.m_id'
				}
			}
		};
	}
}

module.exports = ProposedTimes;