const { Model } = require('objection');

class Members extends Model {
	static get tableName() {
		return 'members';
	}
	static get relationMappings() {
		return {
			member_team: {
				relation: Model.BelongsToOneRelation,
				modelClass: require('./Member_team'),
				join: {
					from: 'members.m_id',
					to: 'member_team.m_id'
				}
			}
		};
	}
}

module.exports = Members;
