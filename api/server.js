require('dotenv').config();

const { tippers, photoUrls } = require('../models');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const knex = require('knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const imageParser = require('../configs/cloudinary');
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

server.post('/api/tippers', imageParser.single('image'), (req, res) => {
    const data = req.body;
    console.log(data);
    if (!data.first_name || !data.last_name || !data.email) {
        res.status(400).json({
            errMessage: 'first_name, last_name, and email required.',
        });
        return;
    }
    tippers
        .insert(data)
        .then(data =>
            tippers.getById(data).then(data => {
                res.status(201).json(data);
            })
        )
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

server.delete('/api/tippers/:id', (req, res) => {
    const { id } = req.params;
    tippers
        .remove(id)
        .then(data =>
            res
                .status(200)
                .json({ message: `User ${id} was removed from the database.` })
        )
        .catch(err => res.status(400).json(err));
});

server.put('/api/tippers/:id', (req, res) => {});

module.exports = server;
