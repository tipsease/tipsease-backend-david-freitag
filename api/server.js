require('dotenv').config();

const { tippers, photoUrls } = require('../models');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const compression = require('compression');
const morgan = require('morgan');
const _ = require('lodash');

const server = express();
server.use(express.json());
server.use(compression());
server.use(helmet());
server.use(morgan());

server.get('/api/tippers', (req, res) => {
    tippers
        .getAll()
        .then(async data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

server.get('/api/tippers/:id', (req, res) => {
    const { id } = req.params;
    tippers
        .getById(id)
        .then(data => res.status(200).json(data))
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = server;
