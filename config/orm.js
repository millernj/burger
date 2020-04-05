const util = require('util');
const connection = require('./connection');

const asyncQuery = (sql, args) => util.promisify(connection.query).call(connection, sql, args);
const asyncConnection = () => util.promisify(connection.connect).call(connection);

module.exports = {

  connect: async () => {
    try {
      await asyncConnection();
      console.log("connected as id " + connection.threadId);
    } catch (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  },

  selectAll: async (table) => {
    return await asyncQuery('SELECT * FROM ??', table);
  },

  insertOne: async (table, document) => {

    let sql = `INSERT INTO ?? SET ?`;

    return await asyncQuery(sql, [table, document]);
  },

  updateOne: async (table, id, update) => {

    let sql = `UPDATE ?? SET ? WHERE id = ?`;

    return await asyncQuery(sql, [table, update, id]);
  }
}