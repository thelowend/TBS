// app/models/user.js

    // load mongoose since we need it to define a model
    const mongoose = require('mongoose');

    module.exports = mongoose.model('User', {
        id : Number,
        name : String
    });
