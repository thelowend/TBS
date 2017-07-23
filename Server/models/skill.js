    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    let SkillSchema = Schema({
      status: { type: Schema.Types.ObjectId, ref: 'Status', required: true },
      name: { type: String, required: true },
      description: { type: String, required: true }
    });

    module.exports = mongoose.model('Skill', SkillSchema);
