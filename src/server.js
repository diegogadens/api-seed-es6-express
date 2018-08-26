const express = require('express');
const queryParser = require('express-query-parser');
const bodyParser = require('body-parser');
const seppuku = require('seppuku');
const config  = require('../config');
const routers = require('./routers');
const log    = require('./log');

exports.createServer = () => {

  const server = express();

  server.use(
    seppuku(server, {
      minDeferralTime: config.shutDownTimeout,
      maxDeferralTime: config.shutDownTimeout,
      trapExceptions: false
    })
  );

  server.on('uncaughtException', (req, res, route, err) => {
    log.error(err);
    res.status(500).send({status:500, message: 'internal error', type:'internal'});
  });

  server.use(
    queryParser({
      parseNull: true,
      parseBoolean: true
    })
  )
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  routers.configureRoutes(server);

  return server;
};
