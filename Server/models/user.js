// app/models/user.js
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const SkillSchema = require('../models/skill');

    let UserExperienceSchema = Schema({
      employer: { type: String, required: true },
      description: { type: String, required: true },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true },
    }, { _id: false });

    let UserSchema = Schema({
      status: { type: Schema.Types.ObjectId, ref: 'Status', required: true },
      file_number: { type: Number, required: true },
      name: { type: String, required: true },
      pid_type: { type: String, required: true },
      pid_number: { type: Number, required: true },
      address: { type: String, required: true },
      phone: { type: Number, required: false },
      email: { type: String, required: true },
      password: { type: String, required: false },
      interests: { type: String, required: false },
      skills: [SkillSchema],
      experience: [UserExperienceSchema],
      roles: { type: Array, required: false }
    });

    module.exports = mongoose.model('User', UserSchema);
