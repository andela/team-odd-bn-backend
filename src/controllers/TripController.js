import dotenv from 'dotenv';
import Customize from '../helpers/Customize';
import { tripRequest, tripRequestCities } from '../database/models';

dotenv.config();
/**
 * @export
 * @class TripController
 */
class TripController {
  /**
   * User can be able to request one-way trip
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   */
  static async requestOnewayTrip(req, res) {
    try {
      const userId = req.user.id;
      const { reason, city, startDate } = req.body;
      const newTrip = await tripRequest.create({
        reason, tripTypeId: 1, userId, startDate
      });

      const requestId = await tripRequest.findOne({ where: { userId } });
      const cityId = parseInt(city, 10);
      await tripRequestCities.create({
        tripRequestId: requestId.dataValues.id, cityId
      });
      return Customize.successMessage(req, res, 'Trip requested successfully', newTrip, 201);
    } catch (err) {
      return Customize.successMessage(req, res, 'Server error', err.message, 500);
    }
  }
}
export default TripController;
