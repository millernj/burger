const orm = require("../config/orm.js");

const burger = {
  getAll: async () => {
    return await orm.selectAll('burgers');
  },
  create: async (burger) => {
    return await orm.insertOne('burgers', burger);
  },
  updateByID: async (id, changes) => {
    return await orm.updateOne('burgers', parseInt(id), changes);
  }
}

module.exports = burger;