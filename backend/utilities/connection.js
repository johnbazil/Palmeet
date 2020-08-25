const Mongoose = require('mongoose');
const { Schema } = require('mongoose');
Mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/palmeet';

let userSchema = Schema({
    name: String,
    userId: String,
    email: String,
    contactNo: Number,
    password:String,
    roomId: String
}, { collection: 'pals' })

let collection = {};

collection.getUserCollection = () => {
    return Mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology : true }).then((database) => {
        return database.model('pals', userSchema)
    }).catch(error => {
        let err = new Error('Could not connect to database');
        err.status = 500;
        throw err;
    })
}

module.exports = collection;