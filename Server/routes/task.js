const mongoose = require('mongoose');

// load the Task model
const Task = require('../models/task');

module.exports = {
	get: function (req, res) {
		Task.findOne({ name: req.query.taskName }, function (err, existingTask) {

			res.status(200).send(existingTask);
		});
	},
	put: function (req, res) {
		//code to insert task
		res.status(200).send('PUT task');
	},
	delete: function (req, res) {
		//code to delete task
		res.status(200).send('DELETE task');
	}
};
