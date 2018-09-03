const jwt = require('express-jwt');

const { secret } = require('../../../configs/auth0');

const jwtCheck = jwt({
  secret,
})

module.exports = jwtCheck;
