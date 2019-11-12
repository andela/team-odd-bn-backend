import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @export
 * @class EmailService
 */
class TokenHelper {
  /**
   * register a new
   * @static
   * @param {Object} user the template to use
   * @returns {Object} sendEmail
   */
  static generateToken(user) {
    const { id, email } = user;
    const payload = {
      id,
      email
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '7d' });
    return token;
  }

  /**
   * register a new
   * @static
   * @param {Object} token the template to use
   * @returns {Object} sendEmail
   */
  static verifyToken(token) {
    let userInfo = {};
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        userInfo = {
          error: 'unauthorized token',
        };
        return;
      }
      userInfo = decoded;
    });
    return userInfo;
  }
}
export default TokenHelper;
