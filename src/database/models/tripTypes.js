'use strict';
module.exports = (sequelize, DataTypes) => {
  const tripTypes = sequelize.define('tripTypes', {
    tripType: DataTypes.STRING
  }, {});
  tripTypes.associate = function(models) {
    tripTypes.hasMany(models.tripRequests,
      {foreignKey: 'id'},
      { onDelete: 'cascade'},
      {onUpdate: 'cascade'}
      );
  };
  return tripTypes;
};

