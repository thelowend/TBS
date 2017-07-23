// app/models/project.js
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    let ProjectSchema = Schema({
      status: { type: Schema.Types.ObjectId, ref: 'Status', required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true },
      client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
      lead: { type: Schema.Types.ObjectId, ref: 'User', required: false },
      //skills: [ProjectSkillSchema],
      skills: { type: Array, required: false },
      //employees: [ProjectUser]
      employees: { type: Array, required: false }
    });

    module.exports = mongoose.model('Project', ProjectSchema);
