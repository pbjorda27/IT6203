
// skill.model.js
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: String, required: true },
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
