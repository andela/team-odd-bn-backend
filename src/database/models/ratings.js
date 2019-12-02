'use strict';
module.exports = (sequelize, DataTypes) => {
  const ratings = sequelize.define('ratings', {
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    review: DataTypes.STRING
  }, {});
  ratings.associate = function(models) {
    ratings.belongsTo(models.users, {
      as: 'users',
      foreignKey: 'userId',
      targetKey: 'id'
    });
  };

  return ratings;
};
