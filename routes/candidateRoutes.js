const path = require('path');

const express = require('express');

const router = express.Router();

const candidateController = require('../controllers/candidate');

const withAuth = require('../middleware');

router.post('/applyjob', withAuth, candidateController.applyJob);
router.post('/editcandidate', withAuth, candidateController.editCandidate);
router.get('/getAllJobs', withAuth, candidateController.getAllJobs);
router.get('/showJob/:id', withAuth, candidateController.showJob);

module.exports = router;
