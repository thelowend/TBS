const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Q = require('q');
const _ = require('underscore');

// load the Skill model
const Skill = require('../models/skill');

module.exports = {
	get: function (req, res) {
		if(_.isEmpty(req.query))
		Q(Skill.find(req.query).exec()).then((skills) => {
			res.status(200).send(skills);
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
