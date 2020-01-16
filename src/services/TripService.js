import Sequelize, { Promise } from 'sequelize';
import {
  tripRequests, trips, userProfile, users, accommodations, cities, tripTypes, status
} from '../database/models';
import TripHelper from '../helpers/TripHelper';
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
      where: { userId: req.user.id },

      include: [{
        model: trips,
      },
      {
        model: tripTypes,
      },
      {
        model: status,
      }],
    };
    const requests = await CommonQueries.findAll(tripRequests, requestsUsersObject);
    const tripsWithCityName = requests.map((tripss) => tripss.trips.map(async (trip) => {
      const { originId, destinationId } = trip;
      const { origin, destination } = await TripHelper.getCityName({ originId, destinationId });
      trip.originId = origin.city;
      trip.destinationId = destination.city;
      return trip;
    }));
    let cc = await Promise.all(tripsWithCityName.map(async (t) => {
      const u = await Promise.all(t);

      return u;
    }));
    cc = [].concat(...cc);
    requests.trips = cc;
    return requests;
  }

  /**
 * A user/Manager should be able to get all trips made in a particular time frame
 * @static
 * @param {object} req request object
 * @memberof class TripService {
 * @returns {object} data
 */
  static async getUserTrips(req) {
    const { Op } = Sequelize;
    const { from, to, user } = req.query;
    const { id, roleId } = req.user;
    let userTripsObject, requests;
    if (roleId !== 6) {
      userTripsObject = {
        where: {
          startDate: {
            [Op.between]: [from, to],
          }
        },
        include: [{
          model: tripRequests,
          attributes: ['statusId'],
          where: {
            userId: id,
            tripTypeId: req.params.tripTypeId
          },
        }
        ],
      };
      requests = await CommonQueries.findAll(trips, userTripsObject);
      const tripsWithCityName = await requests.map(async (trip) => {
        const { originId, destinationId } = trip;
        const { origin, destination } = await TripHelper.getCityName({ originId, destinationId });
        trip.originId = origin.city;
        trip.destinationId = destination.city;
        return trip;
      });
      return Promise.all(tripsWithCityName);
    }
    userTripsObject = {
      where: { managerId: id, userId: user },
      attributes: ['userId'],
      include: [{
        model: users,
        attributes: ['firstName', 'lastName', 'email'],
        as: 'user',
        include: [{
          model: tripRequests,
          attributes: ['statusId'],
          include: [
            {
              model: trips,
              attributes: ['originId', 'destinationId', 'startDate', 'returnDate']

            }
          ]
        }],
      }]
    };
    requests = await CommonQueries.findAll(userProfile, userTripsObject);
    const tripsWithCityName = await requests.map(async (trip) => {
      const {
        originId,
        destinationId
      } = trip.dataValues.user.dataValues.tripRequests[0].dataValues.trips[0].dataValues;
      const {
        origin,
        destination
      } = await TripHelper.getCityName({ originId, destinationId });
      trip.dataValues
        .user.dataValues
        .tripRequests[0].dataValues
        .trips[0].dataValues
        .originId = origin.city;
      trip.dataValues
        .user.dataValues
        .tripRequests[0].dataValues
        .trips[0].dataValues
        .destinationId = destination.city;
      return trip;
    });
    return Promise.all(tripsWithCityName);
  }

  /**
   * Get some info about most traveled destination
   * @static
   * @param {object} req request object
   * @memberof class TripService {
   * @returns {object} data
   */
  static async getInfoAboutDestination() {
    const { cityId, counter } = await TripHelper.findMostTraveledDestination();
    const cityNameObj = {
      where: { id: cityId }, raw: true
    };
    const findAccommodationObj = {
      where: { cityId }, raw: true
    };
    const { city } = await CommonQueries.findOne(cities, cityNameObj);

    const numberOfAccommodations = await CommonQueries.count(accommodations, findAccommodationObj);
    const timeVisited = counter;
    return { city, timeVisited, numberOfAccommodations };
  }

  /**
   * fetch a single trip
   * @static
   * @param {object} tripRequestId request object
   * @memberof class TripService
   * @returns {object} data
   */
  static async getSingleTrip(tripRequestId) {
    const singleTripObject = {
      where: { id: tripRequestId },
      include: [{
        model: trips,
      }],
    };
    const result = await CommonQueries.findOne(tripRequests, singleTripObject);

    const tripsWithRealNames = result.trips.map(async (trip) => {
      const { originId, destinationId } = trip;
      const { origin, destination } = await TripHelper.getCityName({ originId, destinationId });
      trip.dataValues.originId = origin.city;
      trip.destinationId = destination.city;
      return trip;
    });
    result.trips = await Promise.all(tripsWithRealNames);
    return result;
  }

  /**
   * get all triptypes
   * @static
   * @param {object} req request object
   * @memberof class TripService
   * @returns {object} data
   */
  static async getTripTypes() {
    const queryObject = {
      attributes: ['id', 'tripType']
    };
    const allTriptypes = await CommonQueries.findAll(tripTypes, queryObject);

    return allTriptypes;
  }
}

export default TripService;
