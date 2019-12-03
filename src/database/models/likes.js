'use strict';
module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN,
    disliked: DataTypes.BOOLEAN
  }, {});
  likes.associate = function(models) {
    likes.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    likes.belongsTo(models.accommodations, {
      foreignKey: 'accommodationId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return likes;
};
