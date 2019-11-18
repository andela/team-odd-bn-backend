'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define('profile', {
    gender: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    preferedLanguage: DataTypes.STRING,
    preferedLcurrency: DataTypes.STRING,
    address: DataTypes.STRING,
    department: DataTypes.STRING,
    bio: DataTypes.STRING
  }, { freezeTableName: true });
  profile.associate = function (models) {
    profile.belongsTo(models.users, {
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return profile;
};