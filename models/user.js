const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {type: String, required: [true, "firstname is required"]},
    lastName: {type: String, required: [true, 'last name is requires']},
    address:[
        {
            houseNumber: {type: String, required: [true, 'house number, blk or lot is required']},
            street: {type: String, required: [true, 'street is required']},
            brgy: {type: String, required: [true, 'brgy is required']},
            city: {type: String, required: [true, 'city is required']},
            province: {type: String, required: [true, 'province is required']},
            zipCode: {type: String, required: [true, 'zipCode is required']}
        }
    ],
    mobileNumber: {type: String, required: [true, "mobile number is required"]},
    username: {type: String, required: [true, 'username is required']}, 
    email: {type: String, required: [true, 'email is required']},
    password: {type: String, required: [true, 'password is required']},
    isAdmin: {type:Boolean, default: false}, 
    createdOn: {type: Date, default: new Date()},
    isActive: {type: Boolean, default: true},

    purchased:[
        {
            productId: String,
            qty: Number,
            purchasedOn:{type: Date, default: new Date()},
            status:{type: String, default: "pending"}
        }
    ],

     bookings:[
        {
            serviceId: String,
            createdOn:{type: Date, default: new Date()},
            status:{type: String, default: "pending"}
        }
    ]


})

module.exports = mongoose.model('User', userSchema);