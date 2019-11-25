'use strict';
module.exports = (sequelize, DataTypes) => {
  const userProfile = sequelize.define('userProfile', {
    userId: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    address: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    department: DataTypes.STRING,
    managerId: DataTypes.INTEGER,
    bio: DataTypes.STRING
  }, { freezeTableName: true });
  userProfile.associate = function (models) {
    userProfile.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return userProfile;
};
