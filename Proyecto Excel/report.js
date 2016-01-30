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
				var query = { usuario: req.params.user };
				
				if (req.query.fecha) {
					query['fecha'] = {$gte: req.query.fecha};
				}
				
				self.db.collection(req.params.type).find(query, {_id: 0, usuario: 0})
				.toArray(function (err, data) {
					var arr = [];//, titles = [];
					
					/*for (var t in data[0]) {
						titles.push(t);
					}
					
					for (var venta of data) {
						var temp = [];
						for (var t in venta) {
							temp.push(venta[t]);
						}
						arr.push(temp);
					}*/
					
					for (var venta of data) {
						arr.push([venta.fecha, venta.monto, venta.desc]);
					}
					
					res.render('report', {
						titles: ['Fecha', 'Monto', 'Descripcion'],
						data: arr
					});
				});
			}
		}
	}
};

module.exports = self;