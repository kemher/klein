const express = require('express');
const router = express.Router();
const auth = require('../auth');
const userController = require('../controllers/user');

// check if email exist
router.put('/checkEmail', (req, res)=> {
    userController.checkEmail(req.body).then(resultFromController=>res.send(resultFromController));
});

// check if username exist
router.put('/checkUsername', (req, res)=> {
    userController.checkUsername(req.body).then(resultFromController=>res.send(resultFromController));
});

router.post('/validate-password/:id', (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	userController.validatePassword(req.body, req.params).then(resultFromController => res.send(resultFromController))
});


// register a user
router.post('/register', (req, res)=> {
    userController.registerUser(req.body).then(resultFromController=>res.send(resultFromController));
});

// login
router.post('/login', (req,res)=> {
    userController.login(req.body).then(resultFromController=>res.send(resultFromController));
});

// get specific user profile/details 
router.get('/profile', auth.verify, (req,res) => {
    const userData = auth.decode(req.headers.authorization);
    let userId = userData.id;
    userController.getUserDetails(userId).then(resultFromController=>res.send(resultFromController));
});

// update specific profile 
router.patch('/updateProfile', auth.verify, (req, res) => {
    const userData = auth.decode(req.headers.authorization);
    let userId = userData._id;
    userController.updateDetails(userId, req.body).then(resultFromController=>res.send(resultFromController));
});

//setup admin 
router.patch('/set-admin', auth.verify, (req, res)=>{
    userController.setupAdmin(req.body).then(resultFromController=>res.send(resultFromController));
});



module.exports = router;