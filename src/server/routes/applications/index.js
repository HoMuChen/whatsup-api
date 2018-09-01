const Router = require('express').Router;

const getAll = require('./getAll');
const getOne = require('./getOne');

const applications = new Router();

applications.get('/',            getAll);
applications.get('/:id',         getOne);

module.exports = applications;
