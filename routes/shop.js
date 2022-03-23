const express = require('express');
const router = express.Router();
const auth = require('../auth');
const productController = require('../controllers/shop');

// show all products
router.get('/', (req, res) => {
	productController.showAllProducts().then(resultFromController => res.send(resultFromController))
});

// purchase on shop
router.post('/purchase', auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization)
	let data = {
		userId: userData.id,
		productId: req.body.productId,
		qty: req.body.qty
	} 
	if(userData.isAdmin == false) {
	userController.productBought(data).then(resultFromController => res.send(resultFromController))	
	} else {
		return false
	} 
});

// admin function - add a service to the db
router.post('/add-product', auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if (userData.isAdmin == true) {
	productController.addProduct(req.body).then(resultFromController => res.send(resultFromController))		
	} else console.log('not authorized'); return false
	
});
// admin function - archive a product
router.patch('/archive/:id', auth.verify,(req, res) => {
	const userData = auth.decode(req.headers.authorization)
	if(userData.isAdmin == true) {
	productController.archiveProduct(req.params, req.body).then(resultFromController => res.send(resultFromController))	
	} else console.log('not authorized'); return false
});

// admin function - update a product to the db
router.patch('/update-product/:id', auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	if (userData.isAdmin == true) {
	productController.updateProduct(req.params.id,req.body).then(resultFromController => res.send(resultFromController))		
	} else console.log('not authorized'); return false
	
});

module.exports = router;