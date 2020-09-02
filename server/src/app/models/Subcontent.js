import Sequelize, { Model } from 'sequelize';

class Content extends Model {
  static init(sequelize) {
    super.init(
      {
        subtitle: Sequelize.STRING,
        subcontent: Sequelize.TEXT,
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
}

export default Content;
