'use strict';
module.exports = (sequelize, DataTypes) => {
  const accommodations = sequelize.define('accommodations', {
    name: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    googleCoordinate: DataTypes.STRING
  }, {});
  accommodations.associate = function(models) {
    // associations can be defined here
  };
  return accommodations;
};
