var domready = require('domready');
var MainView = require('./views/main');
var Router = require('./router');
var Howls = require('./models/howls');
var Me = require('./models/me');

window.app = {
	init: function () {
		var self = this;

		this.router = new Router();
		this.howls = new Howls();
		window.me = this.me = new Me();

		domready(function() {
			self.view = new MainView({
				el: document.body,
				model: self.me
			});

			self.router.history.start({pushState: true});
		});
	}
};

window.app.init();

