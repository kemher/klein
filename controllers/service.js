const Booking = require('../models/booking');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const Service = require('../models/service');


module.exports.addServices = (serviceDetails) => {
	const {name, description, price} = serviceDetails;

	let newService = new Service({
		name: name,
		description: description,
		price: price
	})
	return newService.save().then((service, err) => {
		if(err) return false
		else return service
	})

}

module.exports.updateServices = (serviceId, serviceDetails) => {
	const {name, description, price} = serviceDetails;

	let updatedService = {
		name: name,
		description: description,
		price: price
	}
	return Service.findByIdAndUpdate(serviceId, updatedService).then((service, err) => {
		if(err) return false
		else return service
	})

}

// Show Available Service
exports.showAllServices = () => {
	return Service.find({}).then(service => {
		return service
	})
};


// Archive service
exports.archiveService = (serviceId, reqBody) => {
	const { id } = serviceId;
	return Service.findById(id).then(service => {
		console.log(service)
		service.status = reqBody.status
		return service.save().then((service, err) => {
			if(err){ console.log(err); return false}
			else return service
		})
	})	
}


module.exports.bookAschedule = (orderId, reqBody) => {
	return Order.findById(orderId).then(result => {
		console.log(result)
		if(result){
			Object.assign(result, reqBody).save()
			return result
		}else return false
	}
	)
}

// purchase product 
exports.productBought = async(data) => {

	let product = await Product.findById(data.productId)
	let user = await User.findById(data.userId);
	let isOrderUpdated = await Order.find({}).then((result, err) => {
		  let newOrder = new Order({
		  		userId: user.id,
		  		productId: data.productId,
		  		productName: product.name,
		  		qty: data.qty,
		  		price: product.price*data.qty
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