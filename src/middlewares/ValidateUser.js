import { check, validationResult } from 'express-validator';
import Customization from '../helpers/Customize';

/**
 * @export
 * @class ValidationUser
 */
class ValidateUser {
  /**
    * Validate user
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @param {object} next next
    * @memberof ValidateUser
    * @returns {object} data
    */
  static validateSignUp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors.map(err => err.msg);
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
}
export default ValidateUser;
