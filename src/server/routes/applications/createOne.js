const uuid = require('uuid/v4');

const { insert } = require('../../store');
const genKeys = require('../../tasks/genKeys');

module.exports = async (req, res) => {
  const user_id = req.user.sub;

  const keys = genKeys();
  const doc = {
    ...req.body,
    user_id,
    secret: uuid(),
    webpush_publickey: keys.publicKey,
    webpush_privatekey: keys.privateKey,
  }

  const result = await insert({ table: 'applications', doc });

  res.json({ ...doc, id: result.generated_keys[0] })
}
