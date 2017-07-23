const mongoose = require('mongoose');

// load the Status model
const Status = require('../models/status');

module.exports = {
	get: function (req, res) {
		Status.findOne({ name: req.query.statusName }, function (err, existingStatus) {

			res.status(200).send(existingStatus);
		});
	},
	put: function (req, res) {
		//code to insert status
		res.status(200).send('PUT status');
	},
	delete: function (req, res) {
		//code to delete status
		res.status(200).send('DELETE status');
	}
};
