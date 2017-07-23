const mongoose = require('mongoose');

// load the Project model
const Project = require('../models/project');

module.exports = {
	get: function (req, res) {
		Project.findOne({ name: req.query.projectName }, function (err, existingProject) {
			//console.log(existingProject);
			res.status(200).send(existingProject);
		});
	},
	put: function (req, res) {
		//code to insert project
		res.status(200).send('PUT project');
	},
	delete: function (req, res) {
		//code to delete project
		res.status(200).send('DELETE project');
	}
};
