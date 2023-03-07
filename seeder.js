const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});

const Bootcamp = require('./models/Bootcamp');

const Course = require('./models/Course');

const conn =  mongoose.connect(process.env.MONGO_CONN);

//console.log(`Connectted to ${conn.connection.host}`);

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'));
const course = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8'));

//Import dat
const importDataToDB = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(course);
        console.log('Data imported successfully');
        process.exit();
    } catch (error) {
        console.error(err);
    }
}

//Delete Data

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Coursex.deleteMany();

        console.log('Data destroyed');
        process.exit();
    } catch (error) {
        console.error(err);
    }
}

if (process.argv[2] === '-i') {
    importDataToDB();
} else if (process.argv[2] === '-d') {
    deleteData();
}