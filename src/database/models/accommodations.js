'use strict';
module.exports = (sequelize, DataTypes) => {
  const accommodations = sequelize.define('accommodations', {
    name: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    googleCoordinates: DataTypes.STRING
  }, {});
  accommodations.associate = function(models) {
    accommodations.hasMany(models.accommodationImages,
      {targetKey: 'accommodationId',
      sourceKey:'id',
       as:'imagesAccommodation'},
      { onDelete: 'cascade'},
      {onUpdate: 'cascade'}
      );
      accommodations.hasMany(models.rooms,
        {targetKey: 'accommodationId',
         sourceKey:'id',
          as:'accommodationRooms'},
        { onDelete: 'cascade'},
        {onUpdate: 'cascade'}
        );
    accommodations.belongsTo(models.cities, {
      sourceKey: "cityId",
      targetKey: "id",
    });
    accommodations.hasMany(models.ratings, {
      targetKey: "accommodationId",
      sourceKey: "id",
      as: "ratings"
    });
  };
  return accommodations;

};
