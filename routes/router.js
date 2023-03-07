const express = require('express');
const courseRouter = require('./courseRoute');

const { getBootcamps, getBootcamp, createBootcamps , updateBootcamp , deleteBootcamp, getBootcampsinradius} = require('../controllers/controller');

const routes = express.Router();

//Re-route to other resource routes

routes.use('/:bootcampId/courses', courseRouter);

routes.route('/radius/:zipcode/:distance').get(getBootcampsinradius);

routes.route('/')
.get(getBootcamps)
.post(createBootcamps);
routes.route('/:id')
.put(updateBootcamp)
.get(getBootcamp)
.delete(deleteBootcamp);

module.exports = routes;