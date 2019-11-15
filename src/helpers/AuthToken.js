import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @export
 * @class Helper
 */
export default class AuthToken {
  /**
      * Store data in Jwt
      * @static
      * @param {object} data data object
      * @memberof AuthToken
      * @returns {object} signToken
      */
  static signToken(data) {
    const { lastName, firstName, ...newData } = data;

    const token = jwt.sign(newData, process.env.JWT_KEY);

    return token;
  }
}
