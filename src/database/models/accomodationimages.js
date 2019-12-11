'use strict';
module.exports = (sequelize, DataTypes) => {
  const accommodationImages = sequelize.define('accommodationImages', {
    accommodationId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {});
  accommodationImages.associate = function(models) {
    accommodationImages.belongsTo(models.accommodations, {
      sourceKey: "accommodationId",
      targetKey: "id",    
    });
  };
  return accommodationImages;
};
