const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Q = require('q');

// load the models
const Client = require('../models/client');
const Project = require('../models/project');
const Role = require('../models/role');
const Skill = require('../models/skill');
const Status = require('../models/status');
const Task = require('../models/task');
const User = require('../models/user');

module.exports = {
	post: function (req, res) {

    //Creates Statuses
    let statusDefer = Q.Defer();
    Status.insertMany([{
      name: 'Activo',
      description: 'Estado activo.'
    },{
      name: 'Inactivo',
      description: 'Estado inactivo.'
    }], function(err, status) {
      if (err) {
        statusDefer.reject();
      }
      statusDefer.resolve('| Statuses created!');
    });

    //Create Clients
    let clientDefer = Q.Defer();
    Client.insertMany([{
      name: 'Cliente Importante',
      description: 'Es un cliente muy importante.'
    },{
      name: 'Cliente Mediocre',
      description: 'Es un cliente mediocre.'
    }], function (err, client) {
      if (err) {
        clientDefer.reject();
      }
      clientDefer.resolve('| Client', client._id, ':', client.name, 'created');
    });

    //Creates skills
    let skillDefer = Q.Defer();
    Skill.insertMany([{
      status: 
      name: 'Javascript',
      description: 'ES5/ES6/ES7'
    },{
      status:
      name: 'Java',
      description: 'Java Enterprise'
    },{
      status:
      name: 'Jenkins',
      description: 'Jenkins Scripts'
    },{
      status:
      name: '3D Modeling',
      description: 'Bender/Maya'
    }], function (err, skill) {
      if (err) {
        skillDefer.reject();
      }
      skillDefer.resolve('| Skill', skill._id, 'created');
    });


    //Creates a project
    let projectDefer = Q.Defer();
    Project.create({
      size: 'small'
    }, function (err, project) {
      if (err) {
        projectDefer.reject();
      }
      projectDefer.resolve('| Project', project._id, 'created');
    });

    //Creates an user
    let userDefer = Q.Defer();
    User.create({
      size: 'small'
    }, function (err, user) {
      if (err) {
        userDefer.reject();
      }
      userDefer.resolve('| User', user._id, 'created');
    });


    Q.allSettled([projectDefer.promise, userDefer.promise]).then(function (err, result) {
      res.status(200).send(result);
    });

	}
};
