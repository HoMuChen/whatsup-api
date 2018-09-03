const { getById, getByIndex } = require('../../store');

module.exports = async (req, res) => {
  const user_id = req.user.sub;
  const application_id = req.params.id;

  const application = await getById({ table: 'applications', id: application_id });

  if(user_id !== application.user_id) {
    return res.json({ status: 'fail', message: 'This application is not owned by you' });
  }

  getByIndex({ table: 'subscriptions',  index: 'application_id', value: application_id })
    .then(docs => res.json(docs))
}
