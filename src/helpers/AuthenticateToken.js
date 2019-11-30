import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @export
 * @class AuthenticateToken
 */
export default class AuthenticateToken {
  /**
    * Store data in Jwt
    * @static
    * @param {object} data data object
    * @memberof AuthenticateToken
    * @returns {object} signToken
    */
  static signToken(data) {
    const token = jwt.sign(data, process.env.JWT_KEY);
    return token;
  }
}
