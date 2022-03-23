const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

	userId: {type: String, require: [true, 'userId is required']},
	serviceId: {type: String, require: [true, 'serviceId is required']},
	setDate: {type: Date, require:[true, 'Date is required']},
	time: {type: String, require: [true, 'time is require']},
	venue: {type: String, require:[true, 'venue is required']},
	status: {type: String, require: [true, 'status is required']},
    createdOn: {type: Date, default: new Date()},
	
})

module.exports = mongoose.model('Booking', bookingSchema);