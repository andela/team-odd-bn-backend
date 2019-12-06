'use strict';
module.exports = (sequelize, DataTypes) => {
  const accommodations = sequelize.define( "accommodations",{
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    googleCoordinates: DataTypes.STRING,
    address: DataTypes.STRING,
  }, { tableName: "accommodations" });
  accommodations.associate = models => {
    // associations can be defined here
    accommodations.belongsTo(models.cities, {
      as: "accommodationCity",
      foreignKey: "cityId",
      targetKey: "id"
    });
    accommodations.hasMany(models.ratings, {
      targetKey: "accommodationId",
      sourceKey: "id",
      as: "ratings"
    });

  };
  return accommodations;
};
