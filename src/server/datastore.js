const Datastore = require('@google-cloud/datastore');

const config = require('../../configs/gcp');
const dataStoreConfig = require('../../configs/datastore');

const NS = dataStoreConfig.namespace;

const datastore = new Datastore({
  projectId: config.projectId,
});

function insert({ namespace=NS, kind, data }) {
  const entities = data.map(doc => ({
    key: datastore.key({
      namespace,
      path: [ kind ]
    }),
    data: doc
  }))

  return datastore
    .insert(entities)
    .then( _ => entities.map(entity => entity.key.id))
}

function remove({ namespace=NS, kind, ids }) {
  const keys = ids.map(id => 
    datastore.key({
      namespace,
      path: [ kind, id ],
    })
  )

  return datastore
    .delete(keys)
    .then( _ => ({ status: 'ok' }))
}

function getByIds({ namespace=NS, kind, ids }) {
  const keys = ids.map(id => 
    datastore.key({
      namespace,
      path: [ kind, id ],
    })
  )

  return datastore
    .get(keys)
    .then(results => results[0])
}

function getAll({ namespace=NS, kind }) {
  const query = datastore.createQuery(namespace, kind)

  return datastore
    .runQuery(query)
    .then(results => results[0])
}

module.exports = {
  insert,
  remove,
  getByIds,
  getAll,
}
