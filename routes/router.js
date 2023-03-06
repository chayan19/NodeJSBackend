const express = require('express');
const { getBootcamps, getBootcamp, createBootcamps , updateBootcamp , deleteBootcamp, getBootcampsinradius} = require('../controllers/controller');

const routes = express.Router();

routes.route('/radius/:zipcode/:distance').get(getBootcampsinradius);

routes.route('/')
.get(getBootcamps)
.post(createBootcamps);
routes.route('/:id')
.put(updateBootcamp)
.get(getBootcamp)
.delete(deleteBootcamp);

module.exports = routes;