const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Q = require('q');
const _ = require('underscore');

// load the Skill model
const Skill = require('../models/skill');

module.exports = {
	get: function (req, res) {
		Q(Skill.find(req.query).populate('status').exec()).then((skills) => {
			res.status(200).send(skills);
		});
	},
	getByStatus: function (req, res) {
		Q(Skill.find(req.query).populate('status').exec()).then((skills) => {
			let response = [];
			_.each(skills, function (skill) {
				if (skill.status.name === req.params.status) {
					response.push(skill);
				}
			});
			res.status(200).send(response);
		});
	},
	put: function (req, res) {
		//code to insert skill
		res.status(200).send('PUT skill');
	},
	delete: function (req, res) {
		//code to delete skill
		res.status(200).send('DELETE skill');
	}
};
