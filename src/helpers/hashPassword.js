import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @export
 * @class HashedPassword
 */
export default class HashedPassword {
  /**
    * Hash password
    * @static
    * @param {object} password password
    * @memberof OperatePassword
    * @returns {object} hashedPassword
    */
  static hashPassword(password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
  }
}
