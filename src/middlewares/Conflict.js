import DataEngine from './DataEngine';
import { cities, users } from '../database/models';

/**
 * @export
 * @class Conflict
 */
class Conflict {
  /**
    * Check if city has conflict
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @param {object} next next
    * @memberof Conflict
    * @returns {object} data
    */
  static isCiteisConflict(req, res, next) {
    return DataEngine.findConflict(req, res, next, cities, { city: req.body.name }, 'The city already exist');
  }

  /**
    * Check if users have conflict user
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @param {object} next next
    * @memberof Conflict
    * @returns {object} data
    */
  static isUsersConflict(req, res, next) {
    return DataEngine.findOne(req, res, next, users, { id: req.params.id }, 'The user already exist');
  }
}


export default Conflict;
