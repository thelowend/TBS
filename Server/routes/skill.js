const mongoose = require('mongoose');

// load the Skill model
const Skill = require('../models/skill');

module.exports = {
	get: function (req, res) {
		Skill.findOne({ name: req.query.skillName }, function (err, existingSkill) {

			res.status(200).send(existingSkill);
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
