'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: DataTypes.STRING,
    signupType: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
  }, {});
  users.associate = function(models) {
    users.hasMany(models.tripRequest, {foreignKey: 'id'});
    users.belongsTo(models.roles, { onDelete: 'cascade' });
  };
  return users;
};
