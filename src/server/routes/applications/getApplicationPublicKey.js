const { getById } = require('../../store');

module.exports = async (req, res) => {
  const id = req.params.id;

  const doc = await getById({ table: 'applications', id });

  if(!doc)  {
    return res.json(null)
  }

  res.json({ publicKey: doc.webpush_publickey })
}
