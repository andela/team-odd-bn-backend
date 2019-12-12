/* eslint-disable no-plusplus */
import Response from './Response';
import emailHelper from './EmailHelper';
import CommonQueries from '../services/CommonQueries';
import { tripRequests, trips, cities } from '../database/models';
import NotificationService from '../services/NotificationService';


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
   * @memberof TripHelper
   * @returns {object} data
   */
  static async createNewTrip(req, res, tripTypeId) {
    try {
      if (tripTypeId === 1) {
        req.body.returnDate = null;
      }
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

      req.result = newTrip;
      await NotificationService.newTripRequestNotification(req);
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

  /**
   * find the most traveled destination
   * @static
   * @memberof class TripChecker
   * @returns {object} data
   */
  static async findMostTraveledDestination() {
    const destinationObj = {
      attributes: ['destinationId'], raw: true
    };
    const getAllDestinations = await CommonQueries.findAll(trips, destinationObj);
    const getDestinationIds = getAllDestinations.map(i => i.destinationId);
    const countHolder = [];
    const newArray = [];

    for (let i = 0; i < getDestinationIds.length; i++) {
      let count = 0;
      for (let z = 0; z < getDestinationIds.length; z++) {
        if (getDestinationIds[z] === getDestinationIds[i]) count++;
      }
      countHolder.push(count);
      newArray.push({ counter: count, cityId: getDestinationIds[i] });
    }
    const maxNumber = Math.max(...countHolder);
    const frequentCityId = newArray.filter((item) => {
      if (item.counter === maxNumber) {
        return { cityId: item.cityId, counts: item.counter };
      }
    });
    const [{ cityId, counter }] = frequentCityId;
    return { cityId, counter };
  }
}

export default TripHelper;
