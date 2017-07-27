// app/models/project.js
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    let ProjectUserSchema = Schema({
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true },
    });

    let ProjectSkillSchema = Schema({
      skill: { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
      amount: { type: Number, required: true, default: 1},
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true }
    });

    let ProjectSchema = Schema({
      status: { type: Schema.Types.ObjectId, ref: 'Status', required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true },
      client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
      lead: { type: Schema.Types.ObjectId, ref: 'User', required: false },
      skills: [ProjectSkillSchema],
      employees: [ProjectUserSchema]
    });

    module.exports = mongoose.model('Project', ProjectSchema);
