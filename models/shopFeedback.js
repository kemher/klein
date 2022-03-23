const mongoose = require('mongoose');

const shopFeebackSchema = new mongoose.Schema({

	productId: {type: String, require: [true, 'bookingId is required']},
	userId: {type: String, require: [true, 'userId is required']},
	remarks: {type: String, required: [true, 'remarks is required']},
	createdOn: {type: Date, default: new Date()}
	
});

module.exports = mongoose.model('ShopFeedback', shopFeebackSchema);