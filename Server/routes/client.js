const mongoose = require('mongoose');

// load the Client model
const Client = require('../models/client');

module.exports = {
	get: function (req, res) {
		Client.findOne({ name: req.query.clientName }, function (err, existingClient) {

			res.status(200).send(existingClient);
		});
	},
	put: function (req, res) {
		//code to insert client
		res.status(200).send('PUT client');
	},
	delete: function (req, res) {
		//code to delete client
		res.status(200).send('DELETE client');
	}
};
