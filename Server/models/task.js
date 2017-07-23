    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    let TaskSchema = Schema({
      name: { type: String, required: true },
      description: { type: String, required: true }
    });

    module.exports = mongoose.model('Task', TaskSchema);
