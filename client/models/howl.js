var Model = require('ampersand-model');
var moment = require('moment');

module.exports = Model.extend({
	initialize: function () {
		this.updateTimeAgo();
	},
	props: {
		id: 'string',
		content: 'string',
		createdAt: 'date',
		user: 'object'
	},
	session: {
		niceDate: 'string'
	},
	updateTimeAgo: function () {
		this.niceDate = moment(this.createdAt).fromNow();
	},
	ajaxConfig: function () {
		return {
			headers: {
				'Auth-Token': me.token
			}
		};
	},
	derived: {
		link: {
			deps: ['user'],
			fn: function () {
				return '/howls/' + this.user.username;
			}
		}
	}
});