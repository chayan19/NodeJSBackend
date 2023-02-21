const express = require('express');
const dotenv = require('dotenv');
const basepath = require('./routes/router');

dotenv.config({path: './config/config.env'});
const port = process.env.PORT || 5000;

const app = express();

//Mount router
app.use('/api/v1/bootcamps', basepath);

app.listen(
    port , 
    console.log(`Server listening on port ${port} and environment ${process.env.NODE_ENV}`
      ));