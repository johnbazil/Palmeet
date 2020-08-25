const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter')
const myErrorLogger = require('./utilities/ErrorLogger');
const myRequestLogger = require('./utilities/RequestLogger');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(myRequestLogger);
app.use('/user', userRouter);
app.use(myErrorLogger);
app.listen(2000);
console.log('Server listening in port 2000');

module.exports = app;