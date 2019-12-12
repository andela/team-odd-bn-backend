'use strict';
module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define('booking', {
    tripId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    checkInDate: DataTypes.DATE,
    checkOutDate: DataTypes.DATE
  }, {});
  booking.associate = function(models) {
    booking.belongsTo(models.trips, {
      foreignKey: "tripId",
      targetKey: "id",
    });
    booking.belongsTo(models.rooms, {
      foreignKey: "roomId",
      targetKey: "id",
    });
  };
  return booking;
};
