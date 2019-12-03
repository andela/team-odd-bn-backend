'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    accommodationId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    roomType: DataTypes.STRING
  }, {});
  rooms.associate = function(models) {
    rooms.belongsTo(models.accommodations, {
      sourceKey: "accommodationId",
      targetKey: "id",
    });
  };
  return rooms;
};
