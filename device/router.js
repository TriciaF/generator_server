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
            res.json({
		result: result.map((config) => config.serialize())
	    });
        })
        .catch( error => {
            console.error(error);
            res.status(500).json({message: 'Internal server error'});
        });
});

module.exports = deviceRouter;
