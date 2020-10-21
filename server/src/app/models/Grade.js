import Sequelize, { Model } from 'sequelize';

class Grade extends Model {
  static init(sequelize) {
    super.init(
      {
        number: Sequelize.INTEGER,
        level: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  /**
   *Relationship with school, where we are making reference to de the  model school through other
   *table created by the relation many to many between schools and grades
   */

  static associate(models) {
    this.belongsToMany(models.School, {
      through: 'educational_stage',
      as: 'schools',
      foreignKey: 'grade_id',
    });
  }
}

export default Grade;
