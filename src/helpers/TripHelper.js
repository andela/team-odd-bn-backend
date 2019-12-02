import Response from './Response';
import emailHelper from './EmailHelper';
import { tripRequests, trips } from '../database/models';


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
}

export default TripHelper;
