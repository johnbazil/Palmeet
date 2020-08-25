const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

router.get('/userSetUp', (req, res, next) => {
    userService.userSetup().then((data) => {
            res.json(data)
            res.send(data)
        })
        .catch(err => {next(err)})
})

router.post('/login', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password
    userService.login(email, password).then(userDetails => {
            res.json(userDetails)
        })
        .catch(err => {next(err)})
})

router.post('/register', (req,res,next) => {
    let formData = req.body;
    console.log(formData);
    userService.register(formData)
        .then(data => {
            res.json(data)
        })
        .catch(err => {next(err)})
})
 router.get('/forgotpassword/:email', (req,res,next) => {
    let email = req.params.email;
    return userService.forgotPassword(email).then(dataf =>{
        if(dataf) { console.log("joooooooohn",dataf);
         res.json(dataf)}
         else{
            let err = new Error('Cannot change password !');
            err.status = 406;
            throw err;
         }
    
 })
})
module.exports = router;