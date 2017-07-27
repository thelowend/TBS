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

const addProjects = function (req, res, db) {
  //lead@tbs.com

  //Getting recently inserted Users
  let clientImportanteId = mongoose.Types.ObjectId(_.find(db.client, (client) => { return client.name === 'Cliente Importante' })._id),
      clientMediocreId = mongoose.Types.ObjectId(_.find(db.client, (client) => { return client.name === 'Cliente Mediocre'})._id),
      clientNikeId = mongoose.Types.ObjectId(_.find(db.client, (client) => { return client.name === 'Nike'})._id),
      clientRGAId = mongoose.Types.ObjectId(_.find(db.client, (client) => { return client.name === 'R/GA'})._id);

  //Getting recently inserted Statuses IDs
  let statusActivoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Activo'})._id),
      statusPendienteId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Pendiente'})._id),
      statusInactivoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Inactivo'})._id),
      statusVigenteId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Vigente'})._id),
      statusFinalizadoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Finalizado'})._id);

  //Getting recently inserted Skill IDs
  let skillJavascriptId = mongoose.Types.ObjectId(_.find(db.skill, (skill) => { return skill.name === 'Javascript'})._id),
      skillJavaId = mongoose.Types.ObjectId(_.find(db.skill, (skill) => { return skill.name === 'Java'})._id),
      skillJenkinsId = mongoose.Types.ObjectId(_.find(db.skill, (skill) => { return skill.name === 'Jenkins'})._id),
      skill3dModelingId = mongoose.Types.ObjectId(_.find(db.skill, (skill) => { return skill.name === '3D Modeling'})._id);

  //Getting recently inserted User IDs
  let userDiegoId = mongoose.Types.ObjectId(_.find(db.user, (user) => { return user.email === 'diegop@tbs.com'})._id),
      userJonId = mongoose.Types.ObjectId(_.find(db.user, (user) => { return user.email === 'jon@tbs.com'})._id),
      userJaneId = mongoose.Types.ObjectId(_.find(db.user, (user) => { return user.email === 'jane@tbs.com'})._id),
      userRRHHId = mongoose.Types.ObjectId(_.find(db.user, (user) => { return user.email === 'hr@tbs.com'})._id),
      userLeadId = mongoose.Types.ObjectId(_.find(db.user, (user) => { return user.email === 'lead@tbs.com'})._id);

  //Creates projects
  let projectDefer = Q.defer();
  Project.insertMany([{
    status: statusActivoId,
    name: 'Proyecto 1',
    description: 'Proyecto para Nike',
    start_date: new Date('Jun 15, 2017'),
    end_date: new Date('Aug 15, 2017'),
    client: clientNikeId,
    lead: userLeadId,
    skills: [],
    employees: []
  },{
    status: statusVigenteId,
    name: 'Proyecto 2',
    description: 'Proyecto 2 para Nike',
    start_date: new Date('Jun 15, 2017'),
    end_date: new Date('Aug 15, 2017'),
    client: clientNikeId,
    lead: null,
    skills: [],
    employees: []
  }], function (err, project) {
    if (err) {
      projectDefer.reject(err);
    }
    projectDefer.resolve(project);
  });


  Q.allSettled([projectDefer.promise]).then(function (results) {
    console.log('---- Projects Added ----');

    _(results).each((result) => {
      db['project'] = result.value;
    });

    res.status(200).send(db);
  });

};

const addUsers = function (req, res, db) {

  //Getting recently inserted Statuses IDs
  let statusActivoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Activo'})._id),
      statusPendienteId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Pendiente'})._id),
      statusInactivoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Inactivo'})._id),
      statusVigenteId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Vigente'})._id),
      statusFinalizadoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Finalizado'})._id);

  //Getting recently inserted Skill IDs
  let skillJavascriptId = mongoose.Types.ObjectId(_.find(db.skill, (skill) => { return skill.name === 'Javascript'})._id),
      skillJavaId = mongoose.Types.ObjectId(_.find(db.skill, (skill) => { return skill.name === 'Java'})._id),
      skillJenkinsId = mongoose.Types.ObjectId(_.find(db.skill, (skill) => { return skill.name === 'Jenkins'})._id),
      skill3dModelingId = mongoose.Types.ObjectId(_.find(db.skill, (skill) => { return skill.name === '3D Modeling'})._id);

  //Getting recently inserted Role IDs
  let roleHRId = mongoose.Types.ObjectId(_.find(db.role, (role) => { return role.name === 'HR'})._id),
      roleLeadId = mongoose.Types.ObjectId(_.find(db.role, (role) => { return role.name === 'Lead'})._id),
      roleProgrammerId = mongoose.Types.ObjectId(_.find(db.role, (role) => { return role.name === 'Programmer'})._id),
      roleAdminId = mongoose.Types.ObjectId(_.find(db.role, (role) => { return role.name === 'Admin'})._id);

  //Creates users
  let userDefer = Q.defer();
  User.insertMany([{
    status: statusActivoId,
    file_number: 123,
    name: 'Diego Pablos',
    pid_type: 'LU',
    pid_number: 1022185,
    address: 'Calle Uno 123',
    phone: 5552222,
    email: 'diegop@tbs.com',
    password: '123',
    interests: 'Basketball, Animals',
    skills: [{
      skill: skillJavascriptId,
      level: 9,
      verified: true
    },{
      skill: skillJenkinsId,
      level: 6,
      verified: false
    }],
    experience: [{
      employer: 'R/GA',
      description: 'Senior Software Engineer',
      start_date: new Date('Jun 15, 2012'),
      end_date: new Date()
    },{
      employer: 'Globant',
      description: 'Analista Programador',
      start_date: new Date('Mar 10, 2010'),
      end_date: new Date('Jun 15, 2012')
    }],
    role: roleProgrammerId
  },{
    status: statusActivoId,
    file_number: 124,
    name: 'Jon Snow',
    pid_type: 'LU',
    pid_number: 11111111,
    address: 'Calle Dos 123',
    phone: 5551111,
    email: 'jon@tbs.com',
    password: '123',
    interests: 'Snow, Swords',
    skills: [{
      skill: skill3dModelingId,
      level: 6,
      verified: false
    },{
      skill: skillJavaId,
      level: 8,
      verified: false
    }],
    experience: [{
      employer: 'COTO',
      description: 'Security',
      start_date: new Date('Jun 15, 2012'),
      end_date: new Date()
    }],
    role: roleAdminId
  },{
    status: statusActivoId,
    file_number: 125,
    name: 'Jane JS',
    pid_type: 'LU',
    pid_number: 10110111,
    address: 'Calle Tres 123',
    phone: 5550000,
    email: 'jane@tbs.com',
    password: '123',
    interests: 'Not Many',
    skills: [{
      skill: skillJavascriptId,
      level: 7,
      verified: true
    },{
      skill: skillJavaId,
      level: 7,
      verified: false
    }],
    experience: [{
      employer: 'COTO',
      description: 'Cashier',
      start_date: new Date('Jun 15, 2012'),
      end_date: new Date()
    }],
    role: roleProgrammerId
  },{
    status: statusActivoId,
    file_number: 126,
    name: 'HR Dude',
    pid_type: 'LU',
    pid_number: 4564567,
    address: 'Calle Cuatro 123',
    phone: 123123123,
    email: 'hr@tbs.com',
    password: '123',
    interests: 'Human Resources',
    skills: [],
    experience: [],
    role: roleHRId
  },{
    status: statusActivoId,
    file_number: 127,
    name: 'Lead Dude',
    pid_type: 'LU',
    pid_number: 111222333,
    address: 'Calle Cinco 123',
    phone: 7777999,
    email: 'lead@tbs.com',
    password: '123',
    interests: 'Human Resources',
    skills: [],
    experience: [{
      employer: 'UADE',
      description: 'Fundación UADE',
      start_date: new Date('Jun 15, 2012'),
      end_date: new Date('Jun 15, 2013')
    }],
    role: roleLeadId
  }], function (err, user) {
    if (err) {
      userDefer.reject(err);
    }
    userDefer.resolve(user);
  });

  Q.allSettled([userDefer.promise]).then(function (results) {
    console.log('---- Users Added ----');

    _(results).each((result) => {
      db['user'] = result.value;
    });

    addProjects(req, res, db);

  });

}

const secondaryTables = function (req, res, db) {
  //Getting recently inserted Tasks IDs
  let taskCreateProjectId = mongoose.Types.ObjectId(_.find(db.task, (task) => { return task.name === 'CreateProject'; })._id),
      taskManageProjectId = mongoose.Types.ObjectId(_.find(db.task, (task) => { return task.name === 'ManageProject'; })._id),
      taskEvaluateSkillsId = mongoose.Types.ObjectId(_.find(db.task, (task) => { return task.name === 'EvaluateSkills'; })._id),
      taskManageSkillsId = mongoose.Types.ObjectId(_.find(db.task, (task) => { return task.name === 'ManageSkills'; })._id);

  //Creates roles
  let roleDefer = Q.defer();
  //roleDefer.resolve();

  Role.insertMany([{
    name: 'HR',
    description: 'Human Resources',
    tasks: [taskCreateProjectId]
  },{
    name: 'Lead',
    description: 'Project Lead',
    tasks: [taskManageProjectId, taskEvaluateSkillsId]
  },{
    name: 'Admin',
    description: 'TBS App Administrator',
    tasks: [taskManageProjectId, taskManageSkillsId]
  },{
    name: 'Programmer',
    description: 'Software Developer',
    tasks: []
  }], function (err, role) {
    if (err) {
      roleDefer.reject(err);
    }
    roleDefer.resolve(role);
  });

  //Getting recently inserted Statuses IDs
  let statusActivoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Activo'; })._id),
      statusPendienteId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Pendiente'; })._id),
      statusInactivoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Inactivo'; })._id),
      statusVigenteId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Vigente'; })._id),
      statusFinalizadoId = mongoose.Types.ObjectId(_.find(db.status, (status) => { return status.name === 'Finalizado'; })._id);

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
      skillDefer.reject(err);
    }
    skillDefer.resolve(skill);
  });


  Q.allSettled([roleDefer.promise, skillDefer.promise]).then(function (results) {
    console.log('---- Secondary Tables Updated ----');

    let map = ['role', 'skill'];
    _(results).each((result, index) => {
      db[map[index]] = result.value;
    });

    addUsers(req, res, db);
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
        statusDefer.reject(err);
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
    },{
      name: 'Nike',
      description: 'Nike Company Portland.'
    },{
      name: 'R/GA',
      description: 'R/GA Media Group'
    }], function (err, clients) {
      //_(clients).each((client) => console.log(client.name, 'Client Inserted'));
      if (err) {
        clientDefer.reject(err);
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
      if (err) {
        taskDefer.reject(err);
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
