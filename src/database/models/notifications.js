'use strict';
module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    userId: DataTypes.INTEGER,
    bookingId:DataTypes.INTEGER,
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
    notifications.belongsTo(models.booking, {
      sourceKey:'bookingId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return notifications;
};
