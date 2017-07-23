    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    let RoleSchema = Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
      tasks: [{ type: Schema.Types.ObjectId, ref: 'Task', required: true }]
    });

    module.exports = mongoose.model('Role', RoleSchema);
