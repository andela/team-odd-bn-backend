'use strict';
module.exports = (sequelize, DataTypes) => {
  const locations = sequelize.define('locations', {
    names: DataTypes.STRING
  }, {});
  locations.associate = function(models) {
    // associations can be defined here
  };
  return locations;
};