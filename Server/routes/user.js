const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jwt-simple');
const moment = require('moment');
const Q = require('q');
const _ = require('underscore');

// load the User model
const User = require('../models/user');

// Private Functions
let createToken = function (user) {
	let payLoad = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix()
	};

	return jwt.encode(payLoad, 'secret');
};

// Public Functions
module.exports = {
  get: function (req, res) {
    //code to get user info
    Q(User.find(req.query).populate('status').populate('skills.skill')).then(function (users) {
			res.status(200).send(users);
		});
  },
	post: function (req, res) {
		//code to insert user
		console.log('------------ POST USER -------------');
		User.findOne({ _id: req.body._id }, (err, usr) => {
			usr.skills = req.body.skills;
			usr.experience = req.body.experience;
			usr.save(function (err, newUser) {
				if (err) {
					res.send(err);
				}
				res.status(200).send({ response: 'User Updated!', value: newUser });
			});
		});
	},
  put: function (req, res) {
    //code to update user
		console.log('------------ PUT USER -------------');
		/*
		User.findOneAndUpdate({ _id: Schema.Types.ObjectId(req.body._id) }, { $set: { skills: req.body.skills }}, { upsert: true }, function(err, doc) {
    if (err) return res.send(500, { error: err });
			console.log(err, doc);
    	return res.send(doc);
		});
		*/
    res.status(200).send('PUT User');
  },
	delete: function (req, res) {
		//code to delete user
		res.status(200).send('DELETE user');
	},
	register: function (req, res) {
		User.findOne({ email: req.body.email }, function (err, existingUser) {
			if (existingUser) {
				return res.status(409).send({ message: 'email is already taken'});
			};

			console.log(err);

			let user = new User(req.body);
			user.save(function(err, result){
				if (!err) {
					console.log('Successfully saved');
					return res.status(200).send({ token: createToken(result) });
				}
			});
		});
	},
	login: function (req, res) {
		Q(User.findOne({ email: req.body.email })
			.populate('skills.skill')
			.populate('status')
			.populate('role')
			.exec()).then(function(user) {
				if (!user) {
					return res.status(401).send({ message: 'email/password is invalid'});
				};

				if (req.body.password === user.password) {
					res.send({
						info: _.omit(user, 'password'),
						token: createToken(user)
					});
				} else {
					return res.status(401).send({ message: 'email/password is invalid'});
				}

			});
	}
};
