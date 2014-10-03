var Model = require('ampersand-model');

module.exports = Model.extend ({
	initialize: function () {
		var self = this;
		if(localStorage.token) {
			self.token = localStorage.token;
		}
		this.on('change:token', function () {
			localStorage.token = self.token;
		});
	},
	props: {
		id: 'string',
		username: 'string'
	},
	session: {
		token: ['string', false, '']
	},
	derived: {
		showLogin: {
			deps: ['token'],
			fn: function () {
				if(this.token) {
					return true;
				}
				else {
					return false;
				}
			}
		}
	}

});