const { Model } = require('objection');

class Corehours extends Model {
	static get tableName() {
		return 'core_hours';
	}
	static get relationMappings() {
		return {
			teams: {
				relation: Model.BelongsToOneRelation,
				modelClass: require('./Members'),
				join: {
					from: 'core_hours.m_id',
					to: 'members.m_id'
				}
			}
		};
	}
}

module.exports = Corehours;