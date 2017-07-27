const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Q = require('q');
const _ = require('underscore');

// load the Project model
const Project = require('../models/project');

module.exports = {
	get: function (req, res) {
		Q(Project.find(req.query).populate('status').exec()).then((skills) => {
			res.status(200).send(skills);
		});
	},
	getByStatus: function (req, res) {
		Q(Project.find().populate('status').exec()).then((projects) => {
			let response = [];
			_.each(projects, function (project) {
				if (project.status.name === req.params.status) {
					response.push(project);
				}
			});
			res.status(200).send(response);
		});
	},
	getAssignedProjects: function (req, res) {
		console.log('assignendndnsd');
		Q(Project.find()
		.populate('status')
		.populate('client')
		.populate('lead')
		.populate('skills')
		.populate('employees')
		.exec()).then((projects) => {
			let response = [];
			//console.log(projects);
			_.each(projects, function (project) {
				let flagFound = false;
				if (project.lead && project.lead._id == req.params.userid) {
					flagFound = true;
					if (req.params.status) {
						if (project.status.name === req.params.status) {
							response.push(project);
						}
					} else {
						response.push(project);
					}
				} else if (!flagFound) {
					_.each(project.employees, function (employee) {
						if(!flagFound && employee._id == req.params.userid) {
							flagFound = true;
							if (!!req.params.status && project.status.name === req.params.status) {
								 response.push(project);
							} else {
								response.push(project);
							}
						}
					});
				}
			});

			res.status(200).send(response);
		});
	},
	getLeadProjects: function (req, res) {
		Q(Project.find({ lead: mongoose.Types.ObjectId(req.params.userid) })
		.populate('status')
		.populate('client')
		.populate('lead')
		.populate('skills')
		.populate('employees')
		.exec()).then((projects) => {
			let response = [];
			_.each(projects, function (project) {
				if (req.params.status) {
					if (project.status.name === req.params.status) {
						response.push(project);
					}
				} else {
					response.push(project);
				}
			});

			res.status(200).send(response);
		});
	},
	getEmployeeProjects: function (req, res) {
		Q(Project.find(req.query)
		.populate('status')
		.populate('client')
		.populate('lead')
		.populate('skills')
		.populate('employees')
		.exec()).then((projects) => {
			console.log(projects);
			let response = [];
			_.each(projects, function (project) {
				let flagFound = false;
				_.each(project.employees, function (employee) {
						if (!flagFound && employee._id == req.params.userid) {
							flagFound = true;
							if (req.params.status) {
								if (project.status.name === req.params.status) {
									response.push(project);
								}
							} else {
								response.push(project);
							}
						}
				});
			});
			res.status(200).send(response);
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
