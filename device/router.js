'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const deviceRouter = express.Router();
const { Device } = require('./models');

deviceRouter.use(bodyParser.json());

deviceRouter.get('/device-config', (req, res) => {
    console.log('enter /device-config GET route');
    Device.find()
        .then (result => {
            console.log('device config = ', result);
            return res.status(200).json(result);
        })
        .catch( error => {
            console.error(error);
           return res.status(500).json({message: 'Internal server error'});
        });
});

module.exports = deviceRouter;
