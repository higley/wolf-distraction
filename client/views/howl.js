var View = require('ampersand-view');
var templates = require('../templates');

module.exports =  View.extend({
	template: templates.includes.howl,
	bindings: {
		'model.niceDate': {
			type: 'text',
			hook: 'date'
		},
		'model.user.username': {
			type: 'text',
			hook: 'link'
		},
		'model.content': {
			type: 'text',
			hook: 'content'
		},
		'model.link': {
			type: 'attribute',
			name: 'href',
			hook: 'link'
		}
	}
});