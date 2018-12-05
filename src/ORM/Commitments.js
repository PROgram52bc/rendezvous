const { Model } = require('objection');

class Commitments extends Model {
	static get tableName() {
		return 'commitments';
	}
	static get relationMappings() {
		return {
			members: {
				relation: Model.BelongsToOneRelation,
				modelClass: require('./Members'),
				join: {
					from: 'commitment.m_id',
					to: 'members.m_id'
				}
			}
		};
	}
}

module.exports = Commitments;