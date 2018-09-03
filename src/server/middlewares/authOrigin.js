const cors = require('cors')

const { getById } = require('../store');

function corsOption(req, callback) {
  const application_id = (req.method === 'GET'    && req.params.id ) ||
                         (req.method === 'POST'   && req.body.application_id ) ||
                         (req.method === 'DELETE' && req.get('x-whatsup-application-id'))

  const origin = req.header('Origin');

  getById({ table: 'applications', id: application_id })
    .then(app => {
      const domain = app && app.domain;

      if(origin !== domain) {
        callback(null, { origin: false });
      }else {
        callback(null, { origin: true });
      }
    })

}

module.exports = cors(corsOption);
