const uuid = require('uuid/v4');

const { insert } = require('../../store');

module.exports = async (req, res) => {
  const { subscription, application_id } = req.body;

  const result = await insert({ table: 'subscriptions', doc: {
    application_id,
    subscription,
  } });

  res.json({ status: 'ok', id: result.generated_keys[0] })
}
