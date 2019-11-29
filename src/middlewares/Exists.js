import DataEngine from './DataEngine';
import { tripRequests } from '../database/models';

/**
 * @export
 * @class Exists
 */
class Exists {
  /**
    * check is the request exist
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @param {object} next next
    * @memberof Exists
    * @returns {object} data
    */
  static isRequestExist(req, res, next) {
    return DataEngine.findOne(
      req,
      res,
      next,
      tripRequests,
      { id: req.params.id, statusId: 1 },
      'The trip is either approved rejected or it doesn\'t exist'
    );
  }

  /**
* check is the request exist
* @static
* @param {object} req request object
* @param {object} res response object
* @param {object} next next
* @memberof Exists
* @returns {object} data
*/
  static isTripRequestExist(req, res, next) {
    return DataEngine.findOne(
      req,
      res,
      next,
      tripRequests,
      { id: req.params.tripRequestId },
      'The trip request doen\'t exist'
    );
  }
}


export default Exists;
