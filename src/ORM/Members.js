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
			}
		};
	}
}

module.exports = Members;
