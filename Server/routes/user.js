const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const moment = require('moment');
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
    User.findOne({ email: req.query.email }, function (err, existingUser) {
      if (!err) {
        res.status(200).send(existingUser);
      } else {
        console.log(err);
      }
    });
  },
  put: function (req, res) {
    //code to insert user
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
		User.findOne({ email: req.body.email }, function(err, user) {
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
