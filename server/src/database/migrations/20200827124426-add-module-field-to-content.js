module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('contents', 'module_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'modules',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('contents', 'module_id');
  },
};
