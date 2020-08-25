const connection = require('../utilities/connection');
const userClass = require('./class/userClass');
const { v4: uuidv4 } = require('uuid')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure:false,
    requireTLS:true,
    auth: {
      user: 'palmeet.authenticate@gmail.com',
      pass: 'J0hnb@zi1'
    }
  });
const userModel = {};
let userSetupData = [
    { userId: 'U1000', name: 'John', email: 'john@gmail.com', contactNo: 9942729275, password: 'John@1234', roomId: ''},
    { userId: 'U1001', name: 'Peter', email: 'peter@gmail.com', contactNo: 9940708860, password: 'Peter@1234', roomId: ''}
]
userModel.userSetup = () => {
    return connection.getUserCollection().then(collection => {
        return collection.deleteMany().then(deleted => {
            return collection.insertMany(userSetupData).then(inserted => {
                if(inserted) return 'Insertion Successful';
                else return null
            })
        })
    })
}

userModel.login = (email) => {
    return connection.getUserCollection().then(collection => {
        return collection.findOne({ 'email': email }).then(user => {
            if (user) {
                return new userClass(user)
            }
            else {
                return null
            }
        })
    })
}

userModel.getPassword = (email) => {
    return connection.getUserCollection().then(collection => {
        return collection.find({ 'email' : email}, {'_id':0, 'password':1}).then(password => {
            if(password.length != 0) {
                return password[0].password;}
            else return null;
        })
    })
}

userModel.generateUserId = () => {
    return connection.getUserCollection().then(collection => {
        return collection.distinct('userId').then(ids => {
            let UIds = [];
            ids.forEach(id => {
                let i = id.substr(1,);
                UIds.push(Number(i))
            })
            let uId = Math.max(...UIds);
            return uId+1;
        })
    })
}

userModel.register = (form) => {
    return connection.getUserCollection().then(collection => {
        let formData = {}
        formData.name = form.name;
        formData.email = form.email;
        formData.contactNo = form.contactNo;
        formData.password = form.password;
        formData.roomId = uuidv4();
        return userModel.generateUserId().then(id => {
            formData.userId = 'U'+id ;
            let userForm = new userClass(formData); 
            return collection.insertMany(userForm).then(data => {
                if(data){
                    return 'Successfully Registered';
                }
                else{
                    return null;
                }
            })
        })
    })
}

userModel.forgotPassword = (email) =>{
    let otp = Math.round( Math.random() *1000000 );
    console.log(email);
    let mailOptions = {
        from: 'palmeet.authenticate@gmail.com',
        to: email,
        subject: 'Palmeet OTP Verification',
        text: `The One Time Password for Palmeet password recovery is ${otp}` 
      };
      return transporter.sendMail(mailOptions).then((info) =>{
        if (info) {
          console.log('Email sent: ' + info.response + otp);
          return otp
        }
      }).catch (err => {
          throw err
      });
    
}
module.exports = userModel
