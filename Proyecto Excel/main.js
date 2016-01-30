var self = {
	set: function (app) {
		for (var route in this.routes.get) {
			app.get(route, this.routes.get[route]);
		}
	},
	routes: {
		get: {
			'/': function (req, res) {
				res.render('home', { name: 'PEPE' });
			},
			'/:name': function (req, res) {
				res.send('Hola ' + req.params.name);
			},
			'/:name/:last': function (req, res) {
				res.send('Hola ' + req.params.name + ' : ' + req.params.last);
			}
		}
	}
};

module.exports = self;