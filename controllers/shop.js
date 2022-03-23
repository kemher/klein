const Shop = require('../models/shop');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const Product = require('../models/product');
const User = require('../models/user');


module.exports.addProduct = (productDetails) => {
	const {name, description, price} = productDetails;

	let newProduct = new Product({
		name: name,
		description: description,
		price: price
	})
	return newProduct.save().then((product, err) => {
		if(err) return false
		else return product
	})

}

module.exports.updateProduct = (productId, productDetails) => {
	const {name, description, price} = productDetails;

	let updatedProduct = {
		name: name,
		description: description,
		price: price
	}
	return Service.findByIdAndUpdate(productId, updatedProduct).then((product, err) => {
		if(err) return false
		else return product
	})

}

// Show Available Products
exports.showAllProducts = () => {
	return Product.find({}).then(product => {
		return product
	})
};

// Archive Product 
exports.archiveProduct = (productId, reqBody) => {
	const { id } = productId;
	console.log(reqBody.isActive);
		return Product.findByIdAndUpdate(id, {isActive: reqBody.isActive}).then((product, err) => {
		if(err) return false
		else return product
		})
	
}

// purchase product 
exports.purchase = async(data) => {

	let product = await Product.findById(data.productId)
	let user = await User.findById(data.userId);
	let isOrderUpdated = await Shop.find({}).then((result, err) => {
		  let newOrder = new Order({
		  		userId: user.id,
		  		productId: data.productId,
		  		productName: product.name,
		  		qty: data.qty,
		  		totalAmount: product.price*data.qty
		 	});
				console.log(newOrder);
				  return newOrder.save().then((order, err) => {
				  	if (err) {
				  		console.log(err)
				  		return false
				  	} else {
				  		return true
				  	}
				  })
		})  
		 
	let isUserUpdated = await User.findById(data.userId).then(user => {
		user.purchased.push({productId: data.productId, numberProductsBought: data.boughtProducts})
		return user.save().then((user,err) => {
			if(err) return false
			else return user
		})	
	});

	let isProductUpdate = await Product.findById(data.productId).then(product => {
		product.purchaser.push({userId: data.userId})
		return product.save().then((product, err) => {
			if(err) return false
			else return product
		})
	})


	if(isUserUpdated && isProductUpdate && isOrderUpdated) return true
	else return false
}
