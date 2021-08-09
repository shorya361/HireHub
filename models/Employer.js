const mongoose = require('mongoose');
const Job = require('./Job');
const User = require('./user');

const EmployerSchema = new mongoose.Schema({
  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

const Employer = mongoose.model('Employer', EmployerSchema);

module.exports = Employer;
