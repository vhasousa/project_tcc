import Sequelize, { Model } from 'sequelize';

class Module extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.INTEGER,
        description: Sequelize.STRING,
        introduction: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Grade, { foreignKey: 'grade_id', as: 'grade' });
    this.belongsToMany(models.Content, {
      through: 'module_contents',
      as: 'contents',
      foreignKey: 'module_id',
    });
  }
}

export default Module;
