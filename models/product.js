const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	
	name: {type: String, require: [true, 'product name is required']},
	description: {type: String, require: [true, 'description is required']},
	price: {type: Number, require: [true, 'Price is required']},
	isActive: {type: Boolean, default: true},
	createdOn: {type: Date, default: new Date()},

	purchased:[
        {
            userId: String,
            qty: Number,
            purchasedOn:{type: Date, default: new Date()},
            status:{type: String, default: "pending"}
        }
    ]

});	

module.exports = mongoose.model('Product', productSchema);