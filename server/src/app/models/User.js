import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        student: Sequelize.BOOLEAN,
        confirmed: Sequelize.BOOLEAN,
        reset_token: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  /**
   *Relationship with school, where we are making reference to de the tables schools and grades through other
   *table created by the relation many to many between schools and grades
   */

  static associate(models) {
    this.belongsTo(models.Grade, {
      foreignKey: 'grade_id',
      as: 'grades',
    });
    this.belongsTo(models.School, {
      foreignKey: 'school_id',
      as: 'schools',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
