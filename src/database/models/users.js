'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      AllowNull:{
        args: false,
        msg: "Please Enter the firstName"
      }
    },
    lastName: {
      type: DataTypes.STRING,
      AllowNull: {
        args: false,
        msg: "Please Enter the lastName"
      }
    },
    email: {
      type:DataTypes.STRING,
      AllowNull: {
        args: false,
        msg: "Please Enter your Email",
       
      }
    },
    password: {
      type: DataTypes.STRING,
      AllowNull: {
        args: false,
        msg: "Please enter your password"
      },
      }
    }
  , {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - password
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *          
 *        example:
 *           firstName: dnffd
 *           lastName: fkbndf
 *           email: fname.lname@andela.com
 *           password: yourpassword
 *
 */