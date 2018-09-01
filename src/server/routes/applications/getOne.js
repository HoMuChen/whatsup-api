const { getByIds } = require('../../store');

module.exports = (req, res) => {
  const id = Number(req.params.id);

  getByIds({ kind: 'applications', ids: [ id ] })
    .then(doc => {
      res.json(doc)
    })
    .catch(e => {
      console.log(e);
      res.json({});
    })
}
