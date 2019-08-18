'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DailyInventories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productID: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING
      },
      onHandQty: {
        type: Sequelize.INTEGER
      },
      unitCost: {
        type: Sequelize.DOUBLE
      },
      onHandValue: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DailyInventories');
  }
};