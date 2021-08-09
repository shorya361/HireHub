const Job = require('../models/Job');
const Employer = require('../models/Employer');
const User = require('../models/user');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const Candidate = require('../models/Candidate');
const secret = 'helloworld';

exports.postJob = (req, res, next) => {
  const { title, description, skillsRequired, locations } = req.body;
  var user = req.user;
  var job = new Job({ title, description, skillsRequired, locations });
  job
    .save()
    .then((response) => {
      // console.log('')
      Employer.findOneAndUpdate({ user: user.id }, {$addToSet:{jobs:job._id}}).then(
        res.json('post uploaded')
      )   
    })

    .catch((err) => {
      console.log(err);
      res.json('error posting job');
    });
};

exports.getAllJobs = async (req, res, next) => {
  const user = req.user;
  const employees= await Employer.find().populate('jobs ')
  employees.forEach(element => {
    if(element.user== user.id){
      res.json(element)
    }
  });
   
};

exports.getJob = async (req, res, next) => {
  const user = req.user;
  const { jobId } = req.body;

  Job.findOne({ _id: jobId })
    .populate('candidates')
    .exec(async (err, job) => {
      if (err) {
        res.json('Internal Server Error');
      }
      const users = job.candidates;
      const candidates = [];
      for (let i = 0; i < users.length; ++i) {
        const skills = await Candidate.findOne({
          user: users[i]['_id'],
        });
        candidates.push({
          name: users[i].name,
          email: users[i].email,
          contact: users[i].contact,
          location: users[i].location,
          skills: [...skills['skills']],
        });
      }
      res.status(200).json({
        job: {
          id: job._id,
          title: job.title,
          description: job.description,
          skillsRequired: job.skillsRequired,
          locations: job.locations,
          candidates: [...candidates],
        },
      });
    });
};

exports.editEmployer = (req, res, next) => {
  const user = req.user;
  const { name, email, location, contact } = req.body;

  User.findByIdAndUpdate(user.id).then((user) => {
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (location) {
      user.location = location;
    }
    if (contact) {
      user.contact = contact;
    }
    user.save().then((response) => {
      const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
        type: user.type,
        contact: user.contact,
        location: user.location,
      };
      const token = jwt.sign(payload, secret, {
        expiresIn: '5h',
      });
      // res.cookie('token', token, { httpOnly: true })
      //   .sendStatus(200);
      res.status(200).json({
        success: true,
        token: token,
      });
    });
  });
};
