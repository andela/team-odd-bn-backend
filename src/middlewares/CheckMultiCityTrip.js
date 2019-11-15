import customize from '../helpers/Customize';
import { users, trips, locations } from '../database/models';
/**
 * @export
 * @class ValidateOneWayTrip
 */
export default class CheckOneWayTrip {
/**
   * validate one-way trip
   * @static
   * @param {object} req response Object
   * @param {object} res request Object
   * @param {object} next next
   * @memberof ValidateOneWayTrip
   * @returns {object} data
   */
  static async checkOnewayData(req, res, next) {
    const loggedUser = req.user.email;
    const { reason, location } = req.body;
    const isUserExist = await users.findOne({ email: loggedUser });
    const isLocationExist = await locations.findOne({ where: { names: location } });
    const isReqExist = await trips.findOne({
      where: {
        email: loggedUser, reason, location, status: 'pending'
      }
    });

    if (!isUserExist) {
      return customize.errorMessage(req, res, 'User does not exist in our system', 403);
    }
    if (!isLocationExist) {
      return customize.errorMessage(req, res, 'Location not exist', 404);
    }

    if (isReqExist) {
      return customize.errorMessage(req, res, 'Trip already exist', 409);
    }
    next();
  }
}
