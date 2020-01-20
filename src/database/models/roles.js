'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define(
    'roles',
    {
      type: DataTypes.STRING
    },
    {}
  );
  roles.associate = function(models) {
    roles.hasMany(
      models.users,
      { sourceKey: 'id' },
      { targetKey: 'roleId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return roles;
};
