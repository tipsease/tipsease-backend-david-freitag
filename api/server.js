require('dotenv').config();

const { tippers } = require('../models');
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
    const image = {};
    const data = req.body;
    if (req.file) {
        data.photo_url = req.file.url;
        data.photo_public_id = req.file.public_id;
    }
    if (!data.first_name || !data.last_name || !data.email) {
        res.status(400).json({
            errMessage: 'first_name, last_name, and email required.',
        });
        return;
    }
    tippers
        .insert(data)
        .then(id => {
            tippers.getById(id[0]).then(data => {
                res.status(201).json(data);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

server.delete('/api/tippers/:id', (req, res) => {
    const { id } = req.params;
    tippers
        .remove(id)
        .then(data => {
            if (data === 0) {
                res.status(404).json({
                    errMessage: `Tipper ${id} does not exist`,
                });
                return;
            }
            res.status(200).json({
                message: `Tipper ${id} was removed from the database.`,
            });
        })
        .catch(err => res.status(500).json(err));
});

server.put('/api/tippers/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;

    tippers
        .update(id, data)
        .then(data => {
            if (data === 0) {
                res.status(404).json({
                    errMessage: `Tipper ${id} does not exist.`,
                });
                return;
            }
            tippers.getById(id).then(data => res.status(200).json(data));
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = server;
