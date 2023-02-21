const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.status(200).json({success: true , msg: 'Get all bootcamps available'});
    //res.end('<h1>hello from express</h1>');

});

routes.post('/', (req, res) => {
    res.status(200).json({success: true , msg: 'Create new bootcamp'});
    //res.end('<h1>hello from express</h1>');

});

routes.put('/:id', (req, res) => {
    res.status(200).json({success: true , msg: `Display boot camps as ${req.params.id}`});
    //res.end('<h1>hello from express</h1>');

});

routes.delete('/:id', (req, res) => {
    res.status(200).json({success: true , msg: `Delete boot camps as ${req.params.id}`});
    //res.end('<h1>hello from express</h1>');

});
module.exports = routes;