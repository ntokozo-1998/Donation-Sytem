const express = require('express');
const user = require('../controllers/user')
const bids = require('../controllers/bids');
const jobs = require('../controllers/jobs');
const posts = require('../controllers/posts');



const router = express.Router()

router.post('/login',user.login);

router.post('/register',user.register);

router.patch('/update/:user_id',user.updateUser);

router.patch('/updateProfilePicture/:user_id',user.updateImage);

router.post('/addBid/:freelancer',bids.addBid);

router.post('/addPost/:user_id',posts.addPost);

router.post('/sendReport/:dev_id/:client_id/:post_id',user.pstatus);

router.get('/getPosts',posts.getPosts);

router.patch('/updatePost/:post_id',posts.updatePost);

router.patch('/updateStatus',posts.updateStatus);

router.post('/forgotPassword',user.forgotPassword);

router.get('/getOnePost/:user_id',posts.getOnePost);

router.get('/getStatus/:post_id',posts.getPostStatus);

router.get('/getOneUser/:user_id',user.getOneUser);

router.get('/getCompleted/:user_id',posts.getCompleted);

router.get('/getInProgress/:user_id',posts.getInProgress);

router.get('/getClientPosts/:user_id',posts.getClientPosts);

router.patch('/rateDeveloper',posts.rateDeveloper);

router.get('/getBids/:user_id',bids.getBids);

router.patch('/decline/:bid_id',bids.decline);

router.patch('/deletePost/:post_id',posts.deletePost);

router.patch('/accept/:post_id',bids.accept);





module.exports = router;