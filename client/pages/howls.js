var View = require('ampersand-view');
var templates = require('../templates');
var HowlView = require('../views/howl');

module.exports = View.extend({
	template: templates.pages.howls,
	events: {
		'click [data-hook=action-howl]': 'handleHowlClick'
	},
	render: function () {
		this.renderWithTemplate();
		this.renderCollection(app.howls, HowlView, this.queryByHook('howls-container'));
	},
	handleHowlClick: function () {
		var textarea = this.queryByHook('howl-input');
		var value = textarea.value;
		var model;

		if(value !== '') {
			model = app.howls.create({
				content: value,
				createdAt: new Date()
			}, {
				error: function () {
					textarea.value = value;
					alert("Whoa; wolves stole your howl.");
					app.howls.remove(model);
				}
			});
			textarea.value = '';
		}
	}
});