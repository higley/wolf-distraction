var Collection = require('ampersand-rest-collection');
var Howl = require('./howl');
var logger = require('andlog');
var highowl = require('hig-howl');

module.exports = Collection.extend({
	model: Howl,
	url: 'http://wolves.technology/howls',
	initialize: function() {
		var self = this;
		this.on('sync', this.updateTimes, this);
		this.fetch();
		this.fetchRealtime();
	},
	comparator: function (model) {
		return -1 * model.createdAt.valueOf();
	},
	updateTimes: function () {
		/*this.each(function(model) {
			model.updateTimeAgo();
		});*/
		this.invoke('updateTimeAgo'); //same as function above
		logger.log('updating times');
	},
	fetchRealtime: function () {
		var connection = new WebSocket('ws://wolves.technology');
		var self = this;

		connection.onmessage = function (event) {
			logger.log('got a new message', event.data);
			var data = JSON.parse(event.data);
			highowl();

			if(data.channel === self.url) {
				self.fetchById(data.id);

			}
		};
	}
});