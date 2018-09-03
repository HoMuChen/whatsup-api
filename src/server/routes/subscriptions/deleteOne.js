const { getById, deleteById } = require('../../store');

module.exports = async (req, res) => {
  const id = req.params.id;

  await deleteById({ table: 'subscriptions', id })

  res.json({ status: 'ok', deleted: id })
}
