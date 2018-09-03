const { getById, deleteById } = require('../../store');

module.exports = async (req, res) => {
  const user_id = req.user.sub;
  const id = req.params.id;

  const doc = await getById({ table: 'applications', id });

  if(doc.user_id !== user_id) {
    return res.json({ message: 'This applications is not owned by you' })
  }

  await deleteById({ table: 'applications', id })

  res.json({ status: 'ok', deleted: id })
}
