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
//         product: "EDGE 8560Z",
//     });

//  Device.remove({_id:"5d09388e5c6ce9211c41adcb" });
//  Device.remove({_id:"5d0a3e7e9e830e51b4b54084" });

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

deviceRouter.get('/product-name', (req, res) => {
    console.log('enter /product-name GET route');
    Device.find()
        .then (result => {
            console.log('product name = ', result[2].product);
            return res.status(200).json(result[2].product);
        })
        .catch( error => {
            console.error(error);
           return res.status(500).json({message: 'Internal server error'});
        });
});

module.exports = deviceRouter;
