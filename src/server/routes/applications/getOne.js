const { getById } = require('../../store');

module.exports = async (req, res) => {
  const user_id = req.user.sub;
  const id = req.params.id;

  const doc = await getById({ table: 'applications', id });

  if(!doc || doc.user_id !== user_id) {
    return res.json(null)
  }

  res.json(doc)
}
