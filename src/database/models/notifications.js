'use strict';
module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    userId: DataTypes.INTEGER,
    tripRequestId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    markRead: DataTypes.BOOLEAN
  }, {});
  notifications.associate = function(models) {
    notifications.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    notifications.belongsTo(models.tripRequests, {
      foreignKey: 'tripRequestId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return notifications;
};
