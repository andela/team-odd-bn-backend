'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      signupType: DataTypes.STRING,
      roleId: DataTypes.INTEGER
    },
    {}
  );
  users.associate = function(models) {
    users.hasMany(
      models.tripRequests,
      { targetKey: 'userId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    users.hasOne(
      models.userProfile,
      { sourceKey: 'id' },
      { targetKey: 'userId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    users.hasMany(
      models.notifications,
      { sourceKey: 'id' },
      { targetKey: 'userId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    users.hasMany(
      models.accommodations,
      { sourceKey: 'id' },
      { targetKey: 'userId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    users.belongsTo(
      models.roles,
      { sourceKey: 'roleId' },
      { targetKey: 'id' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return users;
};
