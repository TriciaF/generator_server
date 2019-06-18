'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const deviceRouter = express.Router();
const { Device } = require('./models');

deviceRouter.use(bodyParser.json());
// Device.insertMany( 
//     {
//         model:"Gen1",
//         serial:"135432",
//         hostname:"Novina_Generator_1",
//         checksum:"4x45654",
//         uptime:"132456",
//         firmware:"v1.01",
//     });


deviceRouter.get('/device-status', (req, res) => {
    console.log('enter /device-status GET route');
    Device.find()
        .then (result => {
            console.log('device status = ', result);
            return res.status(200).json(result);
        })
        .catch( error => {
            console.error(error);
           return res.status(500).json({message: 'Internal server error'});
        });
});

module.exports = deviceRouter;
