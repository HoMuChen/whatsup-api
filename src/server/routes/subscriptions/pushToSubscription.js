const webpush = require('web-push');

const { getById } = require('../../store');

module.exports = async (req, res) => {
  const subscription_id = req.params.id;
  const { message, application_id } = req.body;

  const [ app, doc ] = await Promise.all([
    getById({ table: 'applications', id: application_id }),
    getById({ table: 'subscriptions', id: subscription_id })
  ])

  webpush.setVapidDetails(
    app.domain,
    app.webpush_publickey,
    app.webpush_privatekey,
  )

  webpush.sendNotification(doc.subscription, message);

  res.json({ status: 'ok' })
}
