import { userProfile } from '../database/models';
import Customize from '../helpers/Customize';

/**
 * @export
 * @class TripMiddleware
 */
class TripMiddleware {
  /**
    * Get line manager for trip requests
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @param {object} next next
    * @memberof TripMiddleware
    * @returns {object} data
    */
  static async getLineManager(req, res, next) {
    const { id } = req.user;
    const userIdProfile = await userProfile.findOne({ where: { userId: id } });
    if (!userIdProfile.managerId) {
      return Customize.errorMessage(req, res, 'Please update your line manager', 404);
    }
    const { managerId } = userProfile;
    req.body.managerId = managerId;
    return next();
  }
}
export default TripMiddleware;
