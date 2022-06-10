// inside index.js


const morgan = require('morgan');
const PORT = 3000;
const express = require('express');
const server = express();
const { client } = require('./db');
const apiRouter = require('./api');

client.connect();

server.listen(PORT, () => {
    console.log("The server is up on port", PORT)
    
});


server.use('/api', apiRouter);
server.use(morgan('dev'));
server.use(express.json());