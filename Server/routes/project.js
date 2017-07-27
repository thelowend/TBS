const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Q = require('q');
const _ = require('underscore');

// load the Project model
const Project = require('../models/project');

module.exports = {
	get: function (req, res) {
		let fullQuery = {};
		_.each(req.query, function (value, key) {
			if (/start_date/gi.test(key)) {
				fullQuery[key] = { '$gte': new Date(value) };
			} else if (/end_date/gi.test(key)) {
				fullQuery[key] = { '$lte': new Date(value) };
			} else {
				fullQuery[key] = (value === 'null'? null: value);
			}
		});
		console.log('----------------------');
		console.log(fullQuery);
		console.log('----------------------');
		Q(Project.find(fullQuery)
		.populate('status')
		.populate('client')
		.populate('lead')
		.populate('skills.skill')
		.populate('employees.user')
		.exec()).then((skills) => {
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
		Q(Project.find()
		.populate('status')
		.populate('client')
		.populate('lead')
		.populate('skills.skill')
		.populate('employees.user')
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
		.populate('skills.skill')
		.populate('employees.user')
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
		.populate('skills.skill')
		.populate('employees.user')
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
	post: function(req, res) {
		console.log('------------ POST PROJECT -------------');
		Project.findOne({ _id: req.body._id }, (err, proj) => {
			proj.status = req.body.status;
			proj.employees = req.body.employees;
			proj.lead = req.body.lead;
			proj.skills = req.body.skills;

			proj.save(function (err, newProj) {
				if (err) {
					res.send(err);
				}
				res.status(200).send({ response: 'Project Updated!', value: newProj });
			});
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
