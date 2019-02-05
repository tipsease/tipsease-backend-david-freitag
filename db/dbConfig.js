const RUNTYPE = process.env.RUNTYPE || 'development';

const knex = require('knex');
const config = require('../knexfile');

module.exports = knex(config[RUNTYPE]);
