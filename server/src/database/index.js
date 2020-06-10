import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import Module from '../app/models/Module';
import Content from '../app/models/Content';
import Attach from '../app/models/Attach';
import User from '../app/models/User';
import School from '../app/models/School';
import Grade from '../app/models/Grade';

const models = [Module, Content, Attach, School, Grade, User];

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
    this.connectionMongo = mongoose.connect('mongodb://localhost:27017/tcc', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
