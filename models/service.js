const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
	
	name: {type: String, require: [true,  'product name is required']},
	description: {type: String, require: [true, 'product is required']},
	price: {type: Number, require: [true,  'Price is required']},
	isActive: {type: Boolean, default: true},
	createdOn: {type: Date, default: new Date()},

	bookings:[
        {
            userId: String,
            createdOn:{type: Date, default: new Date()},
            status:{type: String, default: "pending"}
        }
    ],

});

module.exports = mongoose.model('Service', serviceSchema);