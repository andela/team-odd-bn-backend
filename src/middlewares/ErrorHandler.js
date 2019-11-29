import fs from 'fs';
import Customize from '../helpers/Customize';
/**
 * @export
 * @class ErrorHandler
 */
class ErrorHandler {
  /**
     * handle methor errors
     * @static
     * @param {object} req request object
     * @param {object} res response object
     * @param {object} next next
     * @memberof UserController
     * @returns {object} either an error or calls next
     */
  static async methodNotCorrect(req, res, next) {
    const error = new Error('Ooops this method is not allowed');
    error.status = 405;
    next(error);
  }

  /**
     * handle methor errors
     * @static
     * @param {object} req request object
     * @param {object} res response object
     * @param {object} next next
     * @memberof UserController
     * @returns {object} either an error or calls next
     */
  static async methodError(req, res, next) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  }

  /**
     * handle server errors
     * @static
     * @param {object} error request object
     * @param {object} req request object
     * @param {object} res response object
     * @param {object} next next
     * @memberof UserController
     * @returns {object} either an error or calls next
     */
  static async serverError(error, req, res, next) {
    Customize.errorMessage(req, res, error.message, error.status || 500);
    next(error);
  }

  /**
     * writes logs
     * @static
     * @param {object} error request object
     * @param {object} req request object
     * @param {object} res response object
     * @param {object} next next
     * @memberof UserController
     * @returns {object} either an error or calls next
     */
  static async updateLogFile(error, req, res, next) {
    await fs.appendFile(
      'error.log',
      `
    *******************************************************\n
    Date: ${new Date(Date.now())}\n
    Error: ${error.message}\n
    Status: ${error.status || 500}\n
    ********************************************************`,
      (err) => {
        if (err) throw err;
      }
    );
    next();
  }
}
export default ErrorHandler;
