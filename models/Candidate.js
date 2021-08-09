const User = require('./user');

const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  skills: [String],
});

const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;
