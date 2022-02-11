const config = require('config');
const { MongoClient } = require('mongodb');

const { logger } = require('../logger');

const database = config.get('database.mongo');

class Mongo {
  constructor() {
    this._connection = new MongoClient(`mongodb://${database.user}:${database.password}@${database.url}:${database.port}`);
    this.db = this._connection.db(database.name);
  }

  async _connect() {
    try {
      await this._connection.connect();
      logger.info({
        message: 'Connection to mongo database successful',
      });
    } catch(e) {
      logger.error({
        message: 'Error connecting to mongo database',
        reason: e.message,
        stack: e.stack,
      });

      await new Promise(res => setTimeout(res, 1000));

      this._connect();
    }
  }
}

module.exports = {
  Client: new Mongo(),
};

