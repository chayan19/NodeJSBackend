const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const basepath = require('./routes/router');

dotenv.config({path: './config/config.env'});
const port = process.env.PORT || 5000;

const app = express();

// mongodb+srv://choudhurychayanpersonal:<password>@mono-chayan-nodejs.z7inq5x.mongodb.net/test

// Use Morgan to log
if (process.env.NODE_ENV === 'development') {
    console.log('Starting to log...')
    app.use(morgan('dev'));
}


//Mount router
app.use('/api/v1/bootcamps', basepath);

app.listen(
    port , 
    console.log(`Server listening on port ${port} and environment ${process.env.NODE_ENV}`
      ));