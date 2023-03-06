
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
dotenv.config({path: './config/config.env'});
const basepath = require('./routes/router');
const errorHandler = require('./middleware/error');
const db = require ('./config/db');

console.log(`The key ==== ${process.env.GEOCODER_API_KEY}`);
const port = process.env.PORT || 5000;
db();
const app = express();

// mongodb+srv://choudhurychayanpersonal:<password>@mono-chayan-nodejs.z7inq5x.mongodb.net/test

// Use Morgan to log
if (process.env.NODE_ENV === 'development') {
    console.log('Starting to log...')
    app.use(morgan('dev'));
}

app.use(express.json());

//Mount router
app.use('/api/v1/bootcamps', basepath);

//Using error handler
app.use(errorHandler);

server = app.listen(
    port , 
    console.log(`Server listening on port ${port} and environment ${process.env.NODE_ENV}`
      ));

      process.on('unhandledRejection', (err,promise)=>{
        console.log(`Unhandled rejection:${err.message}`);
        server.close(()=> process.exit(1));
    });