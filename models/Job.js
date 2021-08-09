const mongoose = require('mongoose');
const Candidate = require('./Candidate');
const JobSchema = new mongoose.Schema({
  title: { type: String, required: true},
  description: { type: String, required: true },
  skillsRequired: { type: Array },
  locations: { type: Array },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
