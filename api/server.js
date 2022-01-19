const express = require("express");

const server = express();

// DO YOUR MAGIC
const carRouter = require('./cars/cars-router');

server.use(express.json());

server.use('/api/cars', carRouter);

server.get('/', (req, res) => {
  res.json({
    message: 'cars api is working'
  });
});

server.use('*', (req, res, next) => {
  next({
    status: 404,
    message: 'cars not found'
  });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = server;
