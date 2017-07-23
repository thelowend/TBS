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

const secondaryTables = function () {

  // Create Roles
  let roleDefer = Q.Defer();

  Task.find({ name: 'CreateProject' }, { _id: 1 }, function () {

  });

  Task.find({ $and : [{ name: 'ManageProject' }, { name: 'EvaluateSkills'] }}, { _id: 1 }, function () {

  });

  Task.find({ $and : [{ name: 'ManageProject' }, { name: 'ManageSkills'] }}, { _id: 1 }, function () {

  });

  Role.insertMany([{
    name: 'RRHH',
    description: 'Usuario de Recursos Humanos',
    tasks: [TaskSchema]
  },{
    name: 'Lead',
    description: 'Lider de Proyecto',
    tasks: [TaskSchema]
  },{
    name: 'Admin',
    description: 'Administrador de la aplicación',
    tasks: [TaskSchema]
  },{
    name: 'Programador',
    description: 'Usuario Programador',
    tasks: []
  }], function (err, role) {
    if (err) {
      roleDefer.reject();
    }
    roleDefer.resolve('| Roles created');
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

};

module.exports = {
	post: function (req, res) {

    //Creates Statuses
    let statusDefer = Q.Defer();
    Status.insertMany([{
      name: 'Activo',
      description: 'Estado activo.'
    },{
      name: 'Pendiente',
      description: 'Pendiente de aprobación.'
    },{
      name: 'Inactivo',
      description: 'Estado inactivo.'
    },{
      name: 'Vigente',
      description: 'Proyecto Vigente.'
    },{
      name: 'Finalizado',
      description: 'Proyecto finalizado.'
    }], function (err, status) {
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
      clientDefer.resolve('| Clients created');
    });

    //Create Tasks
    let taskDefer = Q.Defer();
    Task.insertMany([{
      name: 'CreateProject',
      description: 'Crear Proyectos y asignarles Cliente, Lead.'
    },{
      name: 'ManageProject',
      description: 'Administrar Skill, Empleados, y Status de un Proyecto.'
    },{
      name: 'ManageSkills',
      description: 'Administrar Skills globales'
    },{
      name: 'EvaluateSkills',
      description: 'Permite verificar los Skills de los User'
    }], function (err, task) {
      if (err) {
        taskDefer.reject();
      }
      taskDefer.resolve('| Tasks created');
    });

    Q.allSettled([statusDefer.promise, clientDefer.promise, taskDefer.promise]).then(function (err, result) {
      console.log(err, result);
      //TODO error check
      //if (!err) {

      //}
      secondaryTables();
    });

	}
};
