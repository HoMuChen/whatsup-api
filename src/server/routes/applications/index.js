const Router = require('express').Router;
const bodyParser = require('body-parser');

const authUser = require('../../middlewares/authUser');
const authOrigin = require('../../middlewares/authOrigin');

const getAll = require('./getAll');
const getOne = require('./getOne');
const deleteOne = require('./deleteOne');
const createOne = require('./createOne');
const getApplicationPublicKey = require('./getApplicationPublicKey');
const getApplicationSubscriptions = require('./getApplicationSubscriptions');

const applications = new Router();

applications.get('/',                    authUser,   getAll);
applications.post('/',                   authUser,   bodyParser.json(), createOne);
applications.get('/:id',                 authUser,   getOne);
applications.delete('/:id',              authUser,   deleteOne);
applications.get('/:id/publicKey',       authOrigin, getApplicationPublicKey);
applications.get('/:id/subscriptions',   authUser,   getApplicationSubscriptions);

module.exports = applications;
