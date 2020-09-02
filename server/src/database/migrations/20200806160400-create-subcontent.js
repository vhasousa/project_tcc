module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subcontents', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      subtitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subcontent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('subcontents');
  },
};
