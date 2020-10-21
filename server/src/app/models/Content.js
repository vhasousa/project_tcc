import Sequelize, { Model } from 'sequelize';

class Content extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
  /**
   * Relationship with attaches, where we are making reference with attach_id attribute
   *
   * Relationship with modules, where we are making reference to de the models through other
   * table created by the relation many to many between content and modules
   */

  static associate(models) {
    this.belongsTo(models.Grade, { foreignKey: 'grade_id', as: 'grade' });
    this.belongsTo(models.Attach, { foreignKey: 'attach_id', as: 'attaches' });
  }
}

export default Content;
