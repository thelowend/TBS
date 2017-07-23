// app/routes.js

// Services
const mongoose = require('mongoose');
const checkAuth = require('../services/checkauth');

// Routes
const RouteInit = require('../routes/init');
const RouteUser = require('../routes/user');
const RouteProject = require('../routes/project');

// expose the routes to our app with module.exports
module.exports = (app) => {
    // api ---------------------------------------------------------------------

    // User Authentication
    app.post('/api/authenticate', RouteUser.login);

    // DB Initialization
    app.post('/api/init', RouteInit.post);

    // Users
    app.get('/api/user', checkAuth, RouteUser.get);
    app.put('/api/user', checkAuth, RouteUser.put);
    app.delete('/api/user', checkAuth, RouteUser.delete);

    // Projects
    app.get('/api/project', checkAuth, RouteProject.get);
    app.put('/api/project', checkAuth, RouteProject.put);
    app.delete('/api/project', checkAuth, RouteProject.delete);

    // Application -------------------------------------------------------------
    app.get('*', (req, res) => {
        res.sendfile('./public/index.html'); //load the single view file
    });

};
