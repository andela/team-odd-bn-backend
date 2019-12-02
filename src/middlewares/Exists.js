import DataEngine from './DataEngine';
import { tripRequests, userProfile, accommodations } from '../database/models';
import Response from '../helpers/Response';
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

  /**
* check if the accommodation exist
* @static
* @param {object} req request object
* @param {object} res response object
* @param {object} next next
* @memberof Exists
* @returns {object} data
*/
  static isAccommodationExist(req, res, next) {
    return DataEngine.findOne(
      req,
      res,
      next,
      accommodations,
      { id: req.params.accommodationId || req.body.accommodationId },
      'The accommodation doesn\'t exist'
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
  static async getLineManager(req, res, next) {
    const { id } = req.user;
    const userIdProfile = await userProfile.findOne({ where: { userId: id } });
    if (!userIdProfile.managerId) {
      return Response.errorMessage(req, res, 'Please update your line manager', 404);
    }
    const { managerId } = userProfile;
    req.body.managerId = managerId;
    return next();
  }
}
export default Exists;
