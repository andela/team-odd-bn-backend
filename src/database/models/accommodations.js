'use strict';
module.exports = (sequelize, DataTypes) => {
  const accommodations = sequelize.define('accommodations', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
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
    accommodations.belongsTo(models.users, {
      sourceKey: "userId",
      targetKey: "id",
    });
    accommodations.hasMany(models.ratings, {
      targetKey: "accommodationId",
      sourceKey: "id",
      as: "ratings"
    });
    accommodations.belongsTo(models.users,
      {
        targetKey: 'id',
        sourceKey: 'userId',
      },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return accommodations;

};
