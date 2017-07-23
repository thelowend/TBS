    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const TaskSchema = require('../models/task');

    let RoleSchema = Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
      tasks: [TaskSchema]
    });

    module.exports = mongoose.model('Role', RoleSchema);
