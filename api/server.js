require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const _ = require('lodash');
const tippersRoute = require('./tippers/tippersRoutes');
const tippeesRoute = require('./tippees/tippeesRoutes');
const registerRoute = require('./register/registerRoute');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan());

server.use('/api/tippers', tippersRoute);
server.use('/api/tippees', tippeesRoute);
server.use('/api/register', registerRoute);

module.exports = server;
