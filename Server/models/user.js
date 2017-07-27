// app/models/user.js
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    let UserExperienceSchema = Schema({
      employer: { type: String, required: true },
      description: { type: String, required: true },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: true },
    });

    let UserSkillSchema = Schema({
      skill: { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
      level: { type: Number, required: true, default: 1, enum: [1,2,3,4,5,6,7,8,9,10] },
      verified: { type: Boolean, required: true, default: false }
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
      skills: [UserSkillSchema],
      experience: [UserExperienceSchema],
      role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
    });

    module.exports = mongoose.model('User', UserSchema);
