const r = require('rethinkdb');

const dbConfig = require('../../configs/rtk');
const __DEV__ = process.env['NODE_ENV'] !== 'production'

function getConn(host, port, db) {
  return r.connect({host, port, db});
}

const deleteById = async ({ table, id, db=dbConfig.db, host=dbConfig.host, port=dbConfig.port, dev=__DEV__ }) => {
  if(__DEV__) {
    console.log(`[Store] deleteById --> ${db}.${table}@${host}:${port} with id ${id}`);
  }

  const conn = await getConn(host, port, db);

  await r.table(table).get(id).delete().run(conn);
  await conn.close();
}

const insert = async ({ table, doc, db=dbConfig.db, host=dbConfig.host, port=dbConfig.port, dev=__DEV__ }) => {
  if(__DEV__) {
    console.log(`[Store] insert --> ${db}.${table}@${host}:${port} with ${doc.length? doc.length: 1} docs`);
  }

  const conn = await getConn(host, port, db);

  const result = await r.table(table).insert(doc).run(conn);
  await conn.close();

  return result;
}

const upsert = async ({ table, doc, db=dbConfig.db, host=dbConfig.host, port=dbConfig.port, dev=__DEV__ }) => {
  if(__DEV__) {
    console.log(`[Store] upsert --> ${db}.${table}@${host}:${port} with ${doc.length? doc.length: 1} docs`);
  }

  const conn = await getConn(host, port, db);

  await r.table(table).insert(doc, {conflict: 'update'}).run(conn);
  await conn.close();
}

const getById = async ({ table, id, db=dbConfig.db, host=dbConfig.host, port=dbConfig.port, dev=__DEV__ }) => {
  if(__DEV__) {
    console.log(`[Store] getById --> ${db}.${table}@${host}:${port} with id:${id}`);
  }

  const conn = await getConn(host, port, db);

  const doc = await r.table(table).get(id).run(conn);
  await conn.close();

  return doc;
}

const getByIndex = async ({ table, index, value, db=dbConfig.db, host=dbConfig.host, port=dbConfig.port, dev=__DEV__ }) => {
  if(__DEV__) {
    console.log(`[Store] getByIndex --> ${db}.${table}@${host}:${port} with index:${index} and value:${value}`);
  }

  const conn = await getConn(host, port, db);

  const cur = await r.table(table).getAll(value, { index }).run(conn);
  const docs = await cur.toArray()
  await conn.close();

  return docs;
}

module.exports = {
  deleteById,
  insert,
  upsert,
  getById,
  getByIndex,
}
