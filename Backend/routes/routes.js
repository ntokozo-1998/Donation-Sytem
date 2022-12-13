const express = require('express');
const user = require('../controllers/user');
const donation = require('../controllers/donation')

const router = express.Router()

router.post('/login',user.login);

router.post('/register',user.register);

router.patch('/update/:user_id',user.updateUser);

router.post('/addDonations/:user_id',donation.addDonations);

// router.get('/getDonations',donation.getPosts);

// router.patch('/updateDonations/:post_id',donation.updatePost);

// router.patch('/updateStatus/',donation.updateStatus);

// router.get('/getOneDonation/:user_id',donation.getOnePost);

// router.get('/getOneUser/:user_id',user.getOneUser);

// router.get('/getCompleted/:user_id',donation.getCompleted);

// router.get('/getInProgress/:user_id',donation.getInProgress);

// router.get('/getDonorDonations/:user_id',donation.getDonorDonations);

// router.patch('/deleteDonations/:post_id',donation.deleteDonation);

module.exports = router;