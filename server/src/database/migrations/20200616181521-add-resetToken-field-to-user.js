module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'reset_token', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'reset_token');
  },
};
