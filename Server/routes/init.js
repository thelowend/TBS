const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Q = require('q');
const _ = require('underscore');

// load the models
const Client = require('../models/client');
const Project = require('../models/project');
const Role = require('../models/role');
const Skill = require('../models/skill');
const Status = require('../models/status');
const Task = require('../models/task');
const User = require('../models/user');

const tertiaryTables = function (req, res, db) {
  //Creates users
  let userDefer = Q.defer();
  User.insertMany([{
    status: statusActivoId,
    file_number: 123,
    name: 'Diego Pablos',
    pid_type: 'DNI',
    pid_number: 1022185,
    address: 'Calle Uno 123',
    phone: 5552222,
    email: 'dpablos@iade.edu.ar',
    password: '123',
    interests: 'Basketball, Animals',
    skills: [{
      skill: { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
      level: { type: Number, required: true, default: 1 },
      verified: { type: Boolean, required: true, default: false }
    },{
      skill: { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
      level: { type: Number, required: true, default: 1 },
      verified: { type: Boolean, required: true, default: false }
    }],
    experience: [{
      employer: { type: String, required: true },
      description: { type: String, required: true },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true }
    },{
      employer: { type: String, required: true },
      description: { type: String, required: true },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true }
    }],
    roles: []
  },{
    status: statusActivoId,
    file_number: 123,
    name: 'Diego Pablos',
    pid_type: 'DNI',
    pid_number: 1022185,
    address: 'Calle Uno 123',
    phone: 5552222,
    email: 'dpablos@iade.edu.ar',
    password: '123',
    interests: 'Basketball, Animals',
    skills: [],
    experience: [],
    roles: []
  },{
    status: statusActivoId,
    file_number: 123,
    name: 'Diego Pablos',
    pid_type: 'DNI',
    pid_number: 1022185,
    address: 'Calle Uno 123',
    phone: 5552222,
    email: 'dpablos@iade.edu.ar',
    password: '123',
    interests: 'Basketball, Animals',
    skills: [],
    experience: [],
    roles: []
  },{
    status: statusActivoId,
    file_number: 123,
    name: 'Diego Pablos',
    pid_type: 'DNI',
    pid_number: 1022185,
    address: 'Calle Uno 123',
    phone: 5552222,
    email: 'dpablos@iade.edu.ar',
    password: '123',
    interests: 'Basketball, Animals',
    skills: [],
    experience: [],
    roles: []
  }], function (err, user) {
    if (err) {
      userDefer.reject();
    }
    userDefer.resolve(user);
  });

  Q.allSettled([userDefer.promise, projectDefer.promise]).then(function (results) {
    console.log('---- Tertiary Tables Updated ----');

    let map = ['user', 'project'];

    _(results).each((result, index) => {
      db[map[index]] = result.value;
    });

    res.status(200).send(db);

  });

}

const secondaryTables = function (req, res, db) {

  //Getting recently inserted Tasks IDs
  let taskCreateProjectId = mongoose.Types.ObjectId(_.find(db.task, (task) => { return task.name === 'CreateProject'}))._id),
      taskManageProjectId = mongoose.Types.ObjectId(_.find(db.task, (task) => { return task.name === 'ManageProject'}))._id),
      taskEvaluateSkills = mongoose.Types.ObjectId(_.find(db.task, (task) => { return task.name === 'EvaluateSkills'}))._id),
      taskManageSkills = mongoose.Types.ObjectId(_.find(db.task, (task) => { return task.name === 'ManageSkills'}))._id);

  //Creates roles
  let roleDefer = Q.defer();
  Role.insertMany([{
    name: 'RRHH',
    description: 'Usuario de Recursos Humanos',
    tasks: [taskCreateProjectId]
  },{
    name: 'Lead',
    description: 'Lider de Proyecto',
    tasks: [taskManageProjectId, taskEvaluateSkills]
  },{
    name: 'Admin',
    description: 'Administrador de la aplicación',
    tasks: [taskManageProjectId, ManageSkills]
  },{
    name: 'Programador',
    description: 'Usuario Programador',
    tasks: []
  }], function (err, role) {
    if (err) {
      roleDefer.reject();
    }
    roleDefer.resolve(role);
  });

  //Getting recently inserted Statuses IDs
  let statusActivoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Activo'}))._id),
      statusPendienteId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Pendiente'}))._id),
      statusInactivoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Inactivo'}))._id),
      statusVigenteId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Vigente'}))._id),
      statusFinalizadoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Finalizado'}))._id);

  //Creates skills
  let skillDefer = Q.defer();
  Skill.insertMany([{
    status: statusActivoId,
    name: 'Javascript',
    description: 'ES5/ES6/ES7'
  },{
    status: statusPendienteId,
    name: 'Java',
    description: 'Java Enterprise'
  },{
    status: statusActivoId,
    name: 'Jenkins',
    description: 'Jenkins Scripts'
  },{
    status: statusPendienteId,
    name: '3D Modeling',
    description: 'Bender/Maya'
  }], function (err, skill) {
    if (err) {
      skillDefer.reject();
    }
    skillDefer.resolve(skill);
  });

  Q.allSettled([roleDefer.promise, skillDefer.promise]).then(function (results) {
    console.log('---- Secondary Tables Updated ----');

    let map = ['role', 'skill'];

    _(results).each((result, index) => {
      db[map[index]] = result.value;
    });

    tertiaryTables(req, res, db);
  });

};

module.exports = {
	post: function (req, res) {

    //Drops existing
    mongoose.connection.db.dropDatabase();

    //Creates Statuses
    let statusDefer = Q.defer();
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
    }], function (err, statuses) {
      //_(statuses).each((status) => console.log(status.name, 'Status Inserted'));
      if (err) {
        statusDefer.reject();
      }
      statusDefer.resolve(statuses);
    });

    //Create Clients
    let clientDefer = Q.defer();
    Client.insertMany([{
      name: 'Cliente Importante',
      description: 'Es un cliente muy importante.'
    },{
      name: 'Cliente Mediocre',
      description: 'Es un cliente mediocre.'
    }], function (err, clients) {
      //_(clients).each((client) => console.log(client.name, 'Client Inserted'));
      if (err) {
        clientDefer.reject();
      }
      clientDefer.resolve(clients);
    });

    //Create Tasks
    let taskDefer = Q.defer();
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
    }], function (err, tasks) {
      //_(tasks).each((task) => console.log(task.name, 'Task Inserted'));
      if (err) {
        taskDefer.reject();
      }
      taskDefer.resolve(tasks);
    });



    Q.allSettled([statusDefer.promise, clientDefer.promise, taskDefer.promise]).then(function (results) {
      console.log('---- Primary Tables Updated ----');

      let db = {};
      let map = ['status', 'client', 'task'];

      _(results).each((result, index) => {
        db[map[index]] = result.value;
      });

      secondaryTables(req, res, db);
    });


	}
};
