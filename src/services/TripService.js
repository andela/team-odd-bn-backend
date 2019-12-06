import {
  tripRequests, trips, userProfile, users
} from '../database/models';
import CommonQueries from './CommonQueries';

/**
 * @export
 * @class TripService
 */
class TripService {
  /**
   * user edit trips
   * @static
   * @param {object} req pass request body
   * @memberof TripService
   * @returns {object} either an error or data
   */
  static async editTripRequestToUser(req) {
    const itinerary = req.body.itinerary ? req.body.itinerary : [req.body];

    const findAllObjQuery = {
      attributes: ['id'],
      where: {
        tripRequestId: req.params.tripRequestId
      }
    };
    const updateStatusQuery = [
      {
        statusId: 1
      },
      {
        where: {
          id: req.params.tripRequestId
        }
      }
    ];

    const getTripsIds = await CommonQueries.findAll(trips, findAllObjQuery);
    await CommonQueries.update(tripRequests, updateStatusQuery);
    itinerary.forEach(async (item, index) => {
      const tripId = getTripsIds[index].dataValues.id;
      await trips.update(
        {
          originId: item.originId,
          destinationId: item.destinationId,
          reason: item.reason,
          startDate: item.startDate,
          returnDate: item.returnDate
        },
        {
          where: { id: tripId }
        }
      );
    });
    return itinerary;
  }

  /**
   * Manager should be able to view approvals
   * @static
   * @param {object}id object
   * @memberof TripService
   * @returns {object} trip requests of requesters that report to manager
   */
  static async availtripRequestsToManager(id) {
    return userProfile.findAll({
      where: { managerId: id },
      attributes: ['id', 'userId'],
      include: [
        {
          model: users,
          attributes: ['id', 'firstName', 'lastName'],
          as: 'user',
          include: [
            {
              model: tripRequests,
              where: { statusId: 1 },
              attributes: ['id', 'tripTypeId', 'statusId'],
              include: [
                {
                  model: trips
                }
              ]
            }
          ],
        }
      ],
    });
  }

  /**
   * A user should be able to get all the requests he/she has made over time
   * @static
   * @param {object} req request object
   * @memberof class TripService {
   * @returns {object} data
   */
  static async getUserRequests(req) {
    const requestsUsersObject = {
      include: [{
        model: tripRequests,
        where: { userId: req.user.id }
      }],
    };
    const requests = await CommonQueries.findAll(trips, requestsUsersObject);
    return requests;
  }
}

export default TripService;
