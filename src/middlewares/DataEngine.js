import Customize from '../helpers/Customize';
/**
 * @export
 * @class DataEngine
 */
class DataEngine {
  /**
   * Check if the data is found
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next
   * @param {object} table table
   * @param {object} condition bject whose key is the column and value is the value
   * @param {object} notFound bject whose key is the column and value is the value
   * @memberof UserController
   * @returns {object} either an error or calls next
   */
  static async findOne(req, res, next, table, condition, notFound) {
    const oneRow = await table.findOne({ where: condition });
    if (!oneRow) {
      return Customize.errorMessage(req, res, notFound, 404);
    }
    req.row = oneRow.dataValues;
    next();
  }

  /**
   * Check if there is a conflict
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next
   * @param {object} table table
   * @param {object} condition bject whose key is the column and value is the value
   * @param {object} conflict Conflict message
   * @memberof UserController
   * @returns {object} either an error or calls next
   */
  static async findConflict(req, res, next, table, condition, conflict) {
    const oneRow = await table.findOne({ where: condition });
    if (oneRow) {
      return Customize.errorMessage(req, res, conflict, 409);
    }
    next();
  }
}
export default DataEngine;
