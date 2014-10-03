var Hapi = require('hapi');
var server = Hapi.createServer(3000, 'localhost');
var moonboots = require('moonboots_hapi');
var templatizer = require('templatizer');


server.pack.register({
	plugin: moonboots,
	options: {
		appPath: '/{p*}',
		moonboots: {
			main: __dirname + '/client/app.js',
			developmentMode: true,
			stylesheets: [
				__dirname + '/styles/bootstrap.css'
			],
			beforeBuildJS: function () {
				templatizer(__dirname + '/templates', __dirname + '/client/templates.js');
			}
		}
	}

}, function () {

	server.start();
	console.log('server running at http://localhost:3000');
});

