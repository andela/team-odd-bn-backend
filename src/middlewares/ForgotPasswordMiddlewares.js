import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import Customize from '../helpers/Customize';

/**
 * @export
 * @class Middlewares
 */
class ForgotPasswordMiddlewares {
  /**
   * forgot password validation middleware
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Object} if an error exists, returns a bad request error response
   */
  static checkForgotPasswordMiddleware(req, res, next) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const err = error.errors.map(err => err.msg);
      return Customize.errorMessage(req, res, err, 400);
    }
    return next();
  }

  /**
   * reset password validation middleware
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Object} returns an error response error exists in the required
   * response format and if password and confirm password do do not match
   */
  static checkResetPasswordMiddleware(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return Customize.errorMessage(req, res, 'Oops! password and confirm password do not match!', 400);
    }
    return next();
  }

  /**
   * decode token middleware
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Object} returns a response error if error exists or returns a token if exists
   */
  static decodeTokenMiddleware(req, res, next) {
    const { token } = req.params;
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      if (decodedToken) {
        req.user = decodedToken;
        return next();
      }
    } catch (error) {
      return Customize.errorMessage(req, res, error.message, 400);
    }
  }

  /**
    * Validate forgot password input
    * @static
    * @returns {object} errors if doesn't follow pre-set rules
    */
  static forgotPasswordRules() {
    return [
      check('email', 'email should follow the correct email format e.g johnode@gmail.com').trim().isEmail(),
    ];
  }


  /**
    * Validate reset password input
    * @static
    * @returns {object} errors if doesn't follow pre-set rules
    */
  static resetPasswordRules() {
    return [
      check('password', 'password should be a minimum length of 6 characters').isLength({ min: 6 }),
      check('confirmPassword', 'confirmPassword should be a minimum password of 6 characters').isLength({ min: 6 }),
    ];
  }
}

export default ForgotPasswordMiddlewares;
