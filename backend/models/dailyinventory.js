'use strict';
module.exports = (sequelize, DataTypes) => {
  const DailyInventory = sequelize.define('DailyInventory', {
    productID: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    onHandQty: DataTypes.INTEGER,
    unitCost: DataTypes.DOUBLE,
    onHandValue: DataTypes.DOUBLE
  }, {});
  DailyInventory.associate = function(models) {
    // associations can be defined here
  };
  return DailyInventory;
};