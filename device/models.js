'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const deviceSchema = mongoose.Schema({
    model: String,
    serial: String,
    firmware: {
        ORK: String,
        DSP: String,
        FPGA: String,
    },
    hostname: String,
    checksum: String,
    uptime: String
});


//serialize method for printing out the schema during debug
deviceSchema.methods.serialize = function() {
    return {
        id: this._id,
        model: this.model,
        serial: this.serial,
        firmware: this.firmware,
        hostname: this.hostname,
        checksum: this.checksum,
        uptime: this.uptime
    };
};

const Device = mongoose.model('devices', deviceSchema);

module.exports = {Device};
