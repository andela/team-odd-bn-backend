'use strict';
module.exports = (sequelize, DataTypes) => {
  const blacklist = sequelize.define('blacklist', {
    token: DataTypes.TEXT
  }, {});
  blacklist.associate = function(models) {
    // associations can be defined here
  };
  return blacklist;
};
