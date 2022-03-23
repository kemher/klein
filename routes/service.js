const express = require('express');
const router = express.Router();
const auth = require('../auth');
const serviceController = require('../controllers/service');

router.get('/', (req, res) => {
	productController.showAllServices().then(resultFromController => res.send(resultFromController))
})

// admin function - add a service to the db
router.post('/add-services', auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if (userData.isAdmin == true) {
	serviceController.addServices(req.body).then(resultFromController => res.send(resultFromController))		
	} else console.log('not authorized'); return false
	
});

router.post('/archive/:id', auth.verify,(req, res) => {
	const userData = auth.decode(req.headers.authorization)
	if(userData.isAdmin == true) {
	serviceController.archiveService(req.params, req.body).then(resultFromController => res.send(resultFromController))	
	} else console.log('not authorized'); return false
})

// admin function - update a service to the db
router.patch('/update-services/:id', auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if (userData.isAdmin == true) {
	serviceController.updateServices(req.params.id,req.body).then(resultFromController => res.send(resultFromController))		
	} else console.log('not authorized'); return false
	
});


// book a schedule
router.post('/bookings', auth.verify, (req, res)=> {
	const userData = auth.decode(req.headers.authorization)
	if (userData.isAdmin == false)
    userController.booking(req.body).then(resultFromController=>res.send(resultFromController));
});


module.exports = router;