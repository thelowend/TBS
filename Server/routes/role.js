const mongoose = require('mongoose');

// load the Role model
const Role = require('../models/role');

module.exports = {
	get: function (req, res) {
		Role.findOne({ name: req.query.roleName }, function (err, existingRole) {

			res.status(200).send(existingRole);
		});
	},
	put: function (req, res) {
		//code to insert role
		res.status(200).send('PUT role');
	},
	delete: function (req, res) {
		//code to delete role
		res.status(200).send('DELETE role');
	}
};
