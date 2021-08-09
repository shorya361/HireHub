const jwt = require('jsonwebtoken');
const multer = require('multer');

const User = require('../models/user');
const Employer = require('../models/Employer');
const Candidate = require('../models/Candidate');

const secret = 'helloworld';

exports.register = (req, res, next) => {
  const { email, name, password, location, contact, type } = req.body;

  var user = new User({ email, name, password, location, contact, type });
  user.save(function (err) {
    if (err) {
      res.json({
        error: 'Email Already Exists',
      });
    } else {
      var userAccordingToType;
      var token;
      if (type == 'employer') {
        userAccordingToType = new Employer({ user: user._id });
        const payload = {
          id: user._id,
          email: email,
          name: user.name,
          type: user.type,
          contact: user.contact,
          location: user.location,
        };
        token = jwt.sign(payload, secret, {
          expiresIn: '5h',
        });
      } else {
        userAccordingToType = new Candidate({ user: user._id });
        Candidate.find({ user: user._id }).then((candidate) => {
          const payload = {
            id: user._id,
            email: email,
            name: user.name,
            type: user.type,
            contact: user.contact,
            location: user.location,
            skills: candidate.skills,
          };
          token = jwt.sign(payload, secret, {
            expiresIn: '5h',
          });
        });
      }
      userAccordingToType
        .save()
        .then((response) => {
          console.log(response);
          res.status(200).json({
            name: user.name,
            email: user.email,
            type: user.type,
            token: token,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    }
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'Internal error please try again',
      });
    } else if (!user) {
      res.json({
        error: 'Incorrect email or password',
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: 'Internal error please try again',
          });
        } else if (!same) {
          res.json({
            error: 'Incorrect email or password',
          });
        } else {
          // Issue token
          if (user.type === 'candidate') {
            Candidate.find({ user: user._id })
              .then((candidate) => {
                const payload = {
                  id: user._id,
                  email: email,
                  name: user.name,
                  type: user.type,
                  contact: user.contact,
                  location: user.location,
                  skills: candidate[0].skills,
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
              })
              .catch((err) => console.log(err));
          } else {
            const payload = {
              id: user._id,
              email: email,
              name: user.name,
              type: user.type,
              contact: user.contact,
              location: user.location,
            };
            const token = jwt.sign(payload, secret, {
              expiresIn: '5h',
            });
            res.status(200).json({
              success: true,
              token: token,
            });
          }
        }
      });
    }
  });
};
exports.userDetails = (req, res, next) => {
  userId = req.user.id;
  User.findById(userId).then((user) => {
    res.json(user);
  });
};
