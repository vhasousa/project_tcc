module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('contents', 'subcontent_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'subcontents',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('contents', 'subcontent_id');
  },
};
