const express = require('express');

const config = require('../../configs/server');
const {
  applications,
} = require('./routes');

const app = new express();

app.use('/api/applications', applications);

app.listen(config.port, config.host, () => {
  console.log(`API server is running on http:\/\/${config.host}:${config.port}`)
})
