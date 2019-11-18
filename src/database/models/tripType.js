'use strict';
module.exports = (sequelize, DataTypes) => {
  const tripType = sequelize.define('tripType', {
    tripType: DataTypes.STRING
  }, {});
  tripType.associate = function(models) {
    // associations can be defined here
  };
  return tripType;
};

