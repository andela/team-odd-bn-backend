'use strict';
module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define('comments', {
        comment: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        tripRequestId: DataTypes.INTEGER,
    }, { freezeTableName: true });
    comments.associate = function (models) {
        comments.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

            comments.belongsTo(models.tripRequests,{
            foreignKey: 'tripRequestId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            }
        );
    };
    return comments;
};
