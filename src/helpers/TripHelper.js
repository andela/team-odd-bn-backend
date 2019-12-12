import Response from './Response';
import emailHelper from './EmailHelper';
import CommonQueries from '../services/CommonQueries';
import { tripRequests, trips, cities } from '../database/models';


/**
 * @export
 * @class TripHelper
 */
class TripHelper {
  /**
   * User can be able to make trip requests
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} tripTypeId trip type ID
   * @memberof TripController
   * @returns {object} data
   */
  static async createNewTrip(req, res, tripTypeId) {
    try {
      const itinerary = req.body.itinerary ? req.body.itinerary : [req.body];
      const userId = req.user.id;
      const newTrip = await tripRequests.create({
        userId, statusId: 1, tripTypeId
      });
      itinerary.forEach(async (item) => {
        await trips.create({
          tripRequestId: newTrip.dataValues.id,
          originId: item.originId,
          destinationId: item.destinationId,
          reason: item.reason,
          startDate: item.startDate,
          returnDate: item.returnDate
        });
      });
      emailHelper.approveEmailHelper(req, process.env.MANAGER_EMAIL);
      return Response.successMessage(req, res, 'Trip requested successfully', newTrip, 201);
    } catch (err) {
      return Response.errorMessage(req, res, err.message, 500);
    }
  }

  /**
  * Should return city names corresponding to both originId and destinationId provided
  * @static
  * @param {object} tripTypeId city type ID
  * @memberof TripController
  * @returns {object} data
  */
  static async getCityName(tripTypeId) {
    const { dataValues: origin } = await CommonQueries.findOne(cities, { where: { id: tripTypeId.originId }, attributes: ['city'] });
    const { dataValues: destination } = await CommonQueries.findOne(cities, { where: { id: tripTypeId.destinationId }, attributes: ['city'] });
    return { origin, destination };
  }
}

export default TripHelper;
