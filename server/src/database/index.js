import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import School from '../app/models/School';
import Grade from '../app/models/Grade';
import Wallet from '../app/models/Wallet';
import Investment from '../app/models/Investment';
import Attach from '../app/models/Attach';

const models = [School, Grade, User, Wallet, Investment, Attach];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.connectionMongo = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
