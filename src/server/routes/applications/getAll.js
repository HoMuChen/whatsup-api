const { getAll } = require('../../store');

module.exports = (req, res) => {
  getAll({ kind: 'applications', size: 50, page: 1})
    .then(doc => {
      res.json(doc)
    })
    .catch(e => {
      console.log(e);
      res.json([]);
    })
}
