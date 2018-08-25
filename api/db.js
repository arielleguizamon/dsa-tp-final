'use strict';

const
	mongoose = require('mongoose'),
	config = require('./config.js');
try {
    mongoose.connect(config.mongodb.server , function (err, res) {
    	if (err) throw err;
    	console.log('Connected to MongoDB!');
    });
} catch (err) {
    console.log('Cannot stablish a connection with MongoDB');
    return;
}
