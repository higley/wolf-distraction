var View = require('ampersand-view');
var PageSwitcher = require('ampersand-view-switcher');
var templates = require('../templates');


module.exports = View.extend({
	template: templates.body,
	autoRender: true,
	events: {
		'click a[href]': 'handleLinkClick'
	},
	bindings: {
		'model.showLogin': {
			type: 'toggle',
			yes: '[data-hook=logout]',
			no: '[data-hook=login]'
		}
	},
	initialize: function () {
		this.listenTo(app.router, 'page', this.handleNewPage);
	},
	render: function () {
		this.renderWithTemplate(this);
		this.pages = new PageSwitcher(this.queryByHook('page-container'));
	},
	handleNewPage: function(page) {
		this.pages.set(page);
	},
	handleLinkClick: function (e) {
		var aTag = e.target;
		var isLocal = aTag.host === window.location.host;
		if(isLocal && !e.altKey && !e.ctrlKey && !e.shiftKey)
		{
			e.preventDefault();
			app.router.history.navigate(aTag.pathname, {trigger: true});
		}
	}
});