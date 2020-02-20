'use strict';
module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define('booking', {
    userId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    checkInDate: DataTypes.DATE,
    checkOutDate: DataTypes.DATE
  }, {});
  booking.associate = function(models) {
    booking.belongsTo(models.users, {
      sourceKey: "userId",
      targetKey: "id",
    });
    booking.belongsTo(models.rooms, {
      sourceKey: "roomId",
      targetKey: "id",
    });

  };
  return booking;
};
