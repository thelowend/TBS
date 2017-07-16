// app/routes.js

// load the User model
const User = require('../models/user');

// expose the routes to our app with module.exports
module.exports = (app) => {

    // api ---------------------------------------------------------------------
    app.get('/api/user', (req, res) => {
      console.log('=============== GET ===============');
      console.log(req, res);
      res.status(200).json({status: "OK GET request to user"});
    });

    app.put('/api/user', (req, res) => {
      console.log('=============== PUT ===============');
      console.log(req, res);
      res.status(200).json({status: "OK PUT request to user"});
    });

    app.delete('/api/user/:id', (req, res) => {
      console.log('=============== DEL ===============');
      console.log(req, res);
      res.status(200).json({status: "OK DELETE request to user"});
    });

    app.get('/api/session', (req, res) => {
      console.log('=============== GET ===============');
      console.log(req, res);
      //req.body.email
      //req.body.password
      res.status(200).json({status: "OK GET session"});
    });

    // application -------------------------------------------------------------
    app.get('*', (req, res) => {
        res.sendfile('./public/index.html'); //load the single view file
    });

};
