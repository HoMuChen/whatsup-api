const { getByIndex } = require('../../store');

module.exports = (req, res) => {
  const user_id = req.user.sub;

  getByIndex({ table: 'applications',  index: 'user_id', value: user_id })
    .then(docs => res.json(docs))
}
