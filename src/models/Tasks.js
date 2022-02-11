const { v4: uuid } = require('uuid');
const { DateTime } = require('luxon');

const { Client } = require('../shared/mongo');

class Tasks {
  constructor() {
    this.db = Client.db;
    this.tasks = this.db.collection('tasks');
  }

  async create(data) {
    data._id = uuid();
    data.created_on = DateTime.utc().toISO();
    data.updated_on = DateTime.utc().toISO();
    await this.tasks.insertOne(data);

    return data;
  }

  async get(id) {
    return this.tasks.findOne({
      _id: id,
    });
  }
}

module.exports = {
  Tasks,
};
