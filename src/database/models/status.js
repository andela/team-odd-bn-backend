'use strict';
module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define('status', {
    status: DataTypes.STRING
  }, {
    tableName: 'status'
  });
    status.associate = function(models) {
      status.hasMany(models.tripRequests, { onDelete: 'cascade'});
    };
  return status;
};
