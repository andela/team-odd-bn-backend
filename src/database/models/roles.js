'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    type: DataTypes.STRING
  }, {});
  roles.associate = function(models) {
    roles.hasMany(models.users, {foreignKey: 'id'});
  };
  return roles;
};
