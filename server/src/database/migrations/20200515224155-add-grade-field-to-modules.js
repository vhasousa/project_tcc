module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('modules', 'grade_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'grades',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('modules', 'grade_id');
  },
};
