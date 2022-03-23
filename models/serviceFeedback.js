const mongoose = require('mongoose');

const serviceFeedbackSchema = new mongoose.Schema({

	bookingId: {type: String, require: [true, 'bookingId is required']},
	userId: {type: String, require: [true, 'userId is required']},
	remarks: {type: String, required: [true, 'remarks is required']},
	createdOn: {type: Date, default: new Date()}
	
});

module.exports = mongoose.model('ServiceFeedback', servicefeedbackSchema);