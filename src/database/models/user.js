'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    signupType: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
  }, {});
  users.associate = function(models) {
    users.belongsTo(models.roles, { onDelete: 'cascade' });
  };
  return users;
};
