module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('contents', 'attach_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'attaches',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('contents', 'attach_id');
  },
};
