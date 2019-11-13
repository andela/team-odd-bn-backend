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
      },
      isVerified: {
        type:DataTypes.BOOLEAN,
        AllowNull: {
          args: true
        }
      },
      signupType: {
        type:DataTypes.BOOLEAN,
        AllowNull: {
          args: true
        }
      }
    }
  , {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};

