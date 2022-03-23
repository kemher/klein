const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({

	userId: {type: String, require: [true, 'userId is required']},
	productId: {type: String, require: [true, 'productId is required']},
	qty: {type: Number, require: [true, 'qty is required']},
	totalAmount: {type: Number, require: [true, 'totalPrice is required']},
    createdOn: {type: Date, default: new Date()},

});


module.exports = mongoose.model('Shop', shopSchema);