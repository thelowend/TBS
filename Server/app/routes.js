// app/routes.js

// Services
const mongoose = require('mongoose');
const checkAuth = require('../services/checkauth');
const checkPermissions = require('../services/checkpermissions');

// Routes
const RouteUser = require('../routes/user');
const RouteProject = require('../routes/project');
const RouteClient = require('../routes/client');
const RouteRole = require('../routes/role');
const RouteSkill = require('../routes/skill');
const RouteStatus = require('../routes/status');
const RouteTask = require('../routes/task');

// expose the routes to our app with module.exports
module.exports = (app) => {
    // api ---------------------------------------------------------------------

    // User Authentication
    app.post('/api/authenticate', RouteUser.login);

    // Users
    app.get('/api/user', checkAuth, checkPermissions, RouteUser.get);
    app.put('/api/user', checkAuth, checkPermissions, RouteUser.put);
    app.delete('/api/user', checkAuth, checkPermissions, RouteUser.delete);

    // Projects
    app.get('/api/project', checkAuth, checkPermissions, RouteProject.get);
    app.put('/api/project', checkAuth, checkPermissions, RouteProject.put);
    app.delete('/api/project', checkAuth, checkPermissions, RouteProject.delete);

    // Client
    app.get('/api/client', checkAuth, checkPermissions, RouteClient.get);
    app.put('/api/client', checkAuth, checkPermissions, RouteClient.put);
    app.delete('/api/client', checkAuth, checkPermissions, RouteClient.delete);

    // Role
    app.get('/api/role', checkAuth, checkPermissions, RouteRole.get);
    app.put('/api/role', checkAuth, checkPermissions, RouteRole.put);
    app.delete('/api/role', checkAuth, checkPermissions, RouteRole.delete);

    // Skill
    app.get('/api/skill', checkAuth, checkPermissions, RoutesSkill.get);
    app.put('/api/skill', checkAuth, checkPermissions, RouteSkill.put);
    app.delete('/api/skill', checkAuth, checkPermissions, RouteSkill.delete);

    // Status
    app.get('/api/status', checkAuth, checkPermissions, RouteStatus.get);
    app.put('/api/status', checkAuth, checkPermissions, RouteStatus.put);
    app.delete('/api/status', checkAuth, checkPermissions, RouteStatus.delete);

    // Task
    app.get('/api/task', checkAuth, checkPermissions, RouteTask.get);
    app.put('/api/task', checkAuth, checkPermissions, RouteTask.put);
    app.delete('/api/task', checkAuth, checkPermissions, RouteTask.delete);

    // Application -------------------------------------------------------------
    app.get('*', (req, res) => {
        res.sendfile('./public/index.html'); //load the single view file
    });

};
