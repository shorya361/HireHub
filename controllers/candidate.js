const User = require('../models/user');
const Job = require('../models/Job');
const Candidate = require('../models/Candidate');

const jwt = require('jsonwebtoken');
const secret = 'helloworld';

exports.applyJob = (req, res, next) => {
  const user = req.user;
  const { jobId } = req.body;
  Job.findByIdAndUpdate(jobId).then((job) => {
    var updatedCandidates;
    if (job.candidates) {
      updatedCandidates = [...job.candidates];
    } else {
      updatedCandidates = [];
    }
    updatedCandidates.push(user.id);
    job.candidates = updatedCandidates;
    job
      .save()
      .then((response) => {
        res.json('Job Applied');
      })
      .catch((err) => {
        res.json('Internal Server Error');
      });
  });
};

exports.getAllJobs = (req, res, next) => {
  Job.find({}, (err, jobs) => {
    if (err) console.log(users);
    res.status(200).json({
      jobs: jobs,
    });
  });
};

exports.showJob = (req, res, next) => {
  const id = req.params.id;
  Job.findById({ _id: id })
    .then((job) => {
      res.status(200).json({ job: job });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.editCandidate = (req, res, next) => {
  const user = req.user;
  const { name, location, contact, skills } = req.body;

  User.findByIdAndUpdate(
    user.id,
    { name: name, location: location, contact: contact },
    { new: true },
    (err, foundUser) => {
      if (err) console.log(err);
      Candidate.updateOne(
        { user: user.id },
        {
          $set: {
            skills: skills,
          },
        },
        { new: true },
        async (err, result) => {
          if (err) console.log(err);
          const foundUser = await User.findById(user.id);
          const payload = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            type: foundUser.type,
            contact: foundUser.contact,
            location: foundUser.location,
            skills: skills,
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
        }
      );
    }
  );
};
