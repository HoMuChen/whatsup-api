const express = require('express');
const morgan = require('morgan');
const jwt = require('express-jwt');

const config = require('../../configs/server');
const {
  applications,
  subscriptions,
} = require('./routes');

const app = new express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/api/applications', applications);
app.use('/api/subscriptions', subscriptions);

app.use('/', express.static('../../../whatsup-admin-console/dist'))

app.listen(config.port, config.host, () => {
  console.log(`API server is running on http:\/\/${config.host}:${config.port}`)
})
