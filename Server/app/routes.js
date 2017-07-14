// app/routes.js

// load the User model
const User = require('../models/user');

// expose the routes to our app with module.exports
module.exports = (app) => {

    // api ---------------------------------------------------------------------
    app.get('/api/user', (req, res) => {
      console.log('=============== GET ===============');
      console.log(req, res);
    });

    app.put('/api/user', (req, res) => {
      console.log('=============== PUT ===============');
      console.log(req, res);
    });

    app.delete('/api/user/:id', (req, res) => {
      console.log('=============== DEL ===============');
      console.log(req, res);
    });

    // application -------------------------------------------------------------
    app.get('*', (req, res) => {
        res.sendfile('./public/index.html'); //load the single view file
    });

};
