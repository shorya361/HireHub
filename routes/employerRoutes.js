const path = require('path');

const express = require('express');

const router = express.Router();

const employerController = require('../controllers/employer');

const withAuth = require('../middleware');

router.post('/postjob', withAuth, employerController.postJob);
router.get('/getAllJobs', withAuth, employerController.getAllJobs);
router.post('/getJob', withAuth, employerController.getJob);
router.post('/editemployer', withAuth, employerController.editEmployer);

module.exports = router;
