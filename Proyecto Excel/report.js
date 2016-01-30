var self = {
	set: function (app, db) {
		self.db = db;
		
		for (var route in this.routes.get) {
			app.get(route, this.routes.get[route]);
		}
	},
	routes: {
		get: {
			'/report/:type/:user': function (req, res) {
				self.db.collection(req.params.type).find({
					usuario: req.params.user, fecha: {$gte: '2015-01-01'}
				}).toArray(function (err, data) {
					console.log(data);
				});
				
				res.render('report', {
					titles: ['fecha', 'monto', 'descripción'],
					data: [
						['2015-01-23', '500', 'Se vendió tal'],
						['2015-01-23', '500', 'Se vendió tal'],
						['2015-01-23', '500', 'Se vendió tal'],
						['2015-01-23', '500', 'Se vendió tal'],
						['2015-01-23', '500', 'Se vendió tal'],
						['2015-01-23', '500', 'Se vendió tal'],
						['2015-01-23', '500', 'Se vendió tal']
					]
				});
			}
		}
	}
};

module.exports = self;