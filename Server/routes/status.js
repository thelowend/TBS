const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Q = require('q');
const _ = require('underscore');

// load the Status model
const Status = require('../models/status');

module.exports = {
	get: function (req, res) {
		//code to get user info
		Q(Status.find(req.query)).then(function (status) {
			res.status(200).send(status);
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
