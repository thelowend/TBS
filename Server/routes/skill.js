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
	post: function (req, res) {
		Skill.findOne({ _id: req.body._id }, (err, skill) => {
			skill.status = req.body.status;
			skill.save(function (err, newSkill) {
				if (err) {
					res.send(err);
				}
				res.status(200).send({ response: 'Skill Updated!', value: newSkill });
			});
		});
		res.status(200).send('POST skill');
	},
	put: function (req, res) {
		//code to insert skill
		res.status(200).send('PUT skill');
	},
	delete: function (req, res) {
		//code to delete skill
		console.log(req.params.id);
		Skill.find({ _id: req.params.id }).remove(function() {
			console.log('OOKKKK');
			res.status(200).send('skill Deleted');
		});

	}
};
