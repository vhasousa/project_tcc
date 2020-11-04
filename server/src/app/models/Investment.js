import Sequelize, { Model } from 'sequelize';

class Investment extends Model {
  static init(sequelize) {
    super.init(
      {
        investment_value: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'users',
    });
  }
}

export default Investment;
