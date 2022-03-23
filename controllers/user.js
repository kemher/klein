const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../auth');

exports.checkEmail = (userDetails) => {
    return User.findOne({email:userDetails.email}).then(data => {
        if(data) return true
        else return false
    })
}
exports.checkUsername = (userDetails) => {
    return User.findOne({username:userDetails.username}).then(data => {
        if(data) return true
        else return false
    })
}

exports.registerUser = (userDetails) => {
    let {firstName, lastName, houseNumber, street, brgy, city, province, zipCode, mobileNumber, username, email, password} = userDetails;
    let firstname = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let lastname = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    let encryptPass = bcrypt.hashSync(password, 10);

    let newUser = new User ({
        firstName: firstname,
        lastName: lastname,
        address: [{
            houseNumber: houseNumber,
            street: street,
            brgy: brgy,
            city: city,
            province: province,
            zipCode: zipCode
        }],
        mobileNumber: mobileNumber,
        username: username,
        email: email,
        password: encryptPass
    })
    return newUser.save().then((data, err)=> {
        if(err) {
            console.log(err);
            return false
        } else return data
    })
}


exports.login = async (details) => {
    let {username, password} = details;
    let matchEmail = await User.findOne({email:username});
    let matchUsername = await User.findOne({username:username});
    if(matchEmail === null) {
        if(matchUsername !== null) {
            const checkPassword=bcrypt.compareSync(password, matchUsername.password);
            if(checkPassword){
                return { access: auth.createAccessToken(matchUsername)}
            } else return false
        }else return false 
    } else {
        const checkPassword=bcrypt.compareSync(password, matchEmail.password);
        if(checkPassword){
            return {access: auth.createAccessToken(matchEmail)}
        }else return false
    }
}

exports.setupAdmin = (reqBody) => {
    const id = reqBody.id;
    return User.findByIdAndUpdate(id, {isAdmin:true}).then(data=>{
        console.log(data)
        return data
    })
}

// get user details
exports.getUserDetails = (userId) => {
    return User.findById(userId).then(data=>{
        return data
    })
}

exports.updateDetails = (userId, details) => {
    let {firstName, lastName, houseNumber, street, brgy, city, province, country, mobileNumber, username, email, password} = details;
    let firstname = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let lastname = lastName.charAt(0).toUpperCase() + lastName.slice(1);

    let updatedDetails = {
            firstName: firstname,
            lastName: lastname,
            address: [{
                houseNumber: houseNumber,
                street: street,
                brgy: brgy,
                city: city,
                province: province,
                country: country
            }],
            username: username,
            email: email,
            password: password
    }
    return User.findByIdAndUpdate(userId, updatedDetails).then(userInfo => {
        console.log(userInfo)
        return true
    })
}

exports.validatePassword = (userDetails, userId) => {
	const {id} = userId;
	const {password} = userDetails;
	return User.findById(id).then(user => {
		if(user){
			const isPasswordMatch = bcrypt.compareSync(password,user.password);
			if(isPasswordMatch) return user
			else return false
		}else return false
	})
}
