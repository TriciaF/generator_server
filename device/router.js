'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { Device } = require('./models');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    Device.find()
        .then (result => {
            console.log('device config = ', result);
            res.json(result.serialize())
        })
        .catch( error => {
            console.error(error);
            res.status(500).json({message: 'Internal server error'});
        });
});

module.exports = {router};