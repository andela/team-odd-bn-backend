'use strict';
module.exports = (sequelize, DataTypes) => {
  const tripType = sequelize.define('tripType', {
    tripType: DataTypes.STRING
  }, {});
  tripType.associate = function(models) {
    tripType.hasMany(models.tripRequest, {foreignKey: 'id'});
  };
  return tripType;
};
