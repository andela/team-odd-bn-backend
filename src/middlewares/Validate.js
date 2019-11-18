import { check, validationResult } from 'express-validator';
import Customization from '../helpers/Customize';

/**
 * @export
 * @class Validate
 */
class Validate {
  /**
    * Validate user
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @param {object} next next
    * @memberof Validate
    * @returns {object} data
    */
  static validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors.map((err) => err.msg);
      return Customization.errorMessage(req, res, errorMessage, 400);
    }
    next();
  }

  /**
    * Validate input
    * @static
    * @returns {object} errors
    */
  static signupRules() {
    return [
      check('firstName', 'first name should be valid').isAlpha(),
      check('lastName', 'last name should be valid').isAlpha(),
      check('email', 'email should be valid').trim().isEmail(),
      check('password', 'minimum password length is 6').isLength({ min: 6 }),
    ];
  }

  /**
    * Validate input
    * @static
    * @returns {object} errors
    */
  static signinRules() {
    return [
      check('email', 'email should be valid').trim().isEmail(),
      check('password', 'minimum password length is 6').isLength({ min: 6 }),
    ];
  }

  /**
  * Validate input
  * @static
  * @returns {object} errors
  */
  static requestMultiTripRules() {
    return [
      check('reason', 'reason should be characters').isLength({ min: 2 }),
    ];
  }

  /**
  * Validate input
  * @static
  * @returns {object} errors
  */
  static locationRules() {
    return [
      check('location', 'location should be characters').isLength({ min: 1 }),
    ];
  }

  /**
* Validate input
* @static
* @returns {object} errors
*/
  static profileUpdateRules() {
    return [
      check('gender', 'Gender should be either Male or Female').isAlpha()
    ];
  }
}
export default Validate;
