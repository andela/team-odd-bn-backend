'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - passoword
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *          name:
 *            type: string
 *        example:
 *           email: fname.lname@andela.com
 *           password: yourpassword
 *
 */
