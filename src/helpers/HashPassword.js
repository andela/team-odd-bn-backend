import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @export
 * @class HashedPassword
 */
export default class HashPassword {
  /**
    * Hash password
    * @static
    * @param {object} password password
    * @memberof HashPassword
    * @returns {object} hashedPassword
    */
  static hashPassword(password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
  }

  /**
    * User can be able to sign in
    * @static
    * @param {object} givenPwd input password
    * @param {object} result actual data
    * @returns {object} data
    * @member HashPassword
    */
  static matchingPassword(givenPwd, result) {
    const { password: actualPassword } = result.dataValues;
    const isPasswordMatch = bcrypt.compareSync(givenPwd, actualPassword);
    return isPasswordMatch;
  }
}
