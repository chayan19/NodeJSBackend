const express = require('express');

const {getCourses} = require('../controllers/coursesController');
const routes = express.Router({mergeParams: true});

routes.route('/')
.get(getCourses);

module.exports = routes;