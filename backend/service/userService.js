const userModel = require('../model/userModel');
const userService = {};

//Setup
userService.userSetup = () => {
    return userModel.userSetup()
        .then(data => {
            if (data) {
                return data
            }
            else {
                let err = new Error('An error occurred while insertion !');
                err.status = 500;
                throw err
            }
        })
}

//Login
userService.login = (email, password) => {
    
    return userModel.login(email)
        .then(data => {
            if (!data) {
                let err = new Error('Enter Registered EmailId !');
                err.status = 404;
                throw err;
            }
            else {
                return userModel.getPassword(email)
                    .then(pass => {
                        if (password != pass) {
                            let err = new Error('Incorrect password !');
                            err.status = 406;
                            throw err;
                        }
                        else {
                            return data;
                        }
                    })
            }
        })
}

//Register
userService.register = (formData) => {
    
    return userModel.login(formData.email)
        .then(data => {
            if(data){
                let err = new Error('The email address has already been registered !');
                err.status = 406;
                throw err;
            }
            else{
                return userModel.register(formData).then(registered => {
                    if(registered) return registered
                    else{
                        let err = new Error('Registration Failed !');
                        err.status = 406;
                        throw err;
                    }
                })
            }
        })
}

//ForgotPassword
userService.forgotPassword = (email) =>{
    return userModel.forgotPassword(email).then(data =>{
        if(data){
            console.log(data);
            return data 
        }
        else{
            return null
        }
    })
}
module.exports = userService