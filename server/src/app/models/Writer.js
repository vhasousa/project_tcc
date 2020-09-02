import Sequelize, { Model } from 'sequelize';

class Writer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Content, {
      through: 'content_author',
      as: 'contents',
      foreignKey: 'writer_id',
    });
  }
}

export default Writer;
