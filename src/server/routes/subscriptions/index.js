const Router = require('express').Router;
const bodyParser = require('body-parser');
const cors = require('cors');

const authUser = require('../../middlewares/authUser');
const authOrigin = require('../../middlewares/authOrigin');

//const getOne = require('./getOne');
const deleteOne = require('./deleteOne');
const createOne = require('./createOne');
const pushToSubscription = require('./pushToSubscription');

const subscriptions = new Router();

subscriptions.options('/',                  cors());
subscriptions.post('/',                     bodyParser.json(), authOrigin, createOne);
subscriptions.options('/:id',               cors());
subscriptions.delete('/:id',                authOrigin, deleteOne);
subscriptions.post('/:id/push',             bodyParser.json(), authUser, pushToSubscription);

module.exports = subscriptions;
