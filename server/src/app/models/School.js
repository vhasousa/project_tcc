import Sequelize, { Model } from 'sequelize';

class School extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  /**
   *Relationship with grade, where we are making reference to de the  model school through other
   *table created by the relation many to many between grades and schools
   */

  static associate(models) {
    this.belongsToMany(models.Grade, {
      through: 'educational_stage',
      as: 'grades',
      foreignKey: 'school_id',
    });
  }
}

export default School;
