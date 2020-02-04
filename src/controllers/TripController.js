import { tripRequests, trips } from '../database/models';
import TripService from '../services/TripService';
import Response from '../helpers/Response';
import TripHelper from '../helpers/TripHelper';
import NotificationService from '../services/NotificationService';


const { availtripRequestsToManager, getUserRequests, getTripTypes } = TripService;
const { createNewTrip } = TripHelper;
/**
 * @export
 * @class TripController
 */
class TripController {
  /**
   * User can be able to request one-way trip
   * User can be able to request multi-city trip
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   */
  static async OneWayTripController(req, res) {
    createNewTrip(req, res, 1);
  }

  /**
   * User can be able to request two way trip
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   */
  static async returnTripController(req, res) {
    createNewTrip(req, res, 2);
  }

  /**
   * User can be able to request one-way trip
   * User can be able to request multi-city trip
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   */
  static async requestTrip(req, res) {
    createNewTrip(req, res, 3);
  }

  /**
   * A user should be able to get all the requests he/she has made over time
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   */
  static async getUserRequests(req, res) {
    try {
      const requests = await getUserRequests(req);
      return Response.successMessage(req, res, 'succesfully fetched all  user\'s requests', requests, 200);
    } catch (err) {
      return Response.errorMessage(req, res, err.message, 500);
    }
  }

  /**
   * fetch a single trip
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   */
  static async getSingleTrip(req, res) {
    try {
      const { tripRequestId } = req.params;
      const result = await TripService.getSingleTrip(tripRequestId);
      return Response.successMessage(req, res, 'succesfully fetched one  trip', result, 200);
    } catch (err) {
      return Response.errorMessage(req, res, err.message, 500);
    }
  }

  /**
   * Manager should be able to accept a trip request
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   */
  static async acceptOrRejectRequestsController(req, res) {
    const { reason } = req.body;
    await NotificationService.ApprovedOrRejectedTripNotification(req, reason);
    return (req.query.status === 'reject')
      ? Response.successMessage(req, res, 'this request has successfully rejected...', { reason }, 200)
      : Response.successMessage(req, res, 'this request has successfully accepted...', { reason }, 200);
  }

  /**
   * Users should be able to edit a trip
   * @static
   * @param {object} req request object
   * @description PUT /api/v1/trips/edit/TriprequestID
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   */
  static async editTrip(req, res) {
    try {
      const result = await TripService.editTripRequestToUser(req);
      NotificationService.editedTripNotification(req);
      return Response.successMessage(req, res, 'Trip edited successfuly', result, 200);
    } catch (err) {
      return Response.errorMessage(req, res, err.message, 500);
    }
  }

  /**
   * Manager should be able to view requests for approvals
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   * @description PATCH api/v1/trips/requests
   */
  static async getRequestsByManager(req, res) {
    const { id } = req.user;

    try {
      const result = await availtripRequestsToManager(id);
      if (result.length === 0) {
        return Response.errorMessage(req, res, 'No trip requests are available for review', 404);
      }
      return Response.successMessage(req, res, 'Requests fetched successfully', result, 200);
    } catch (error) {
      return Response.errorMessage(req, res, 'Oops! internal server error', 500);
    }
  }

  /**
 * Manager/User should be able to get trip stats he made in X timeframe
 * @static
 * @param {object} req request object
 * @param {object} res response object
 * @memberof TripController
 * @returns {object} data
 * @description PATCH api/v1/trips/requests
 */
  static async getTripStatsController(req, res) {
    try {
      const { from, to } = req.query;
      const userTrips = await TripService.getUserTrips(req);
      const tripsCounter = userTrips.length;
      const msg = `All one way trips made between ${from} and ${to} retrieved successfully!`;
      Response.successMessage(req, res, msg, { tripsCounter, userTrips }, 200);
    } catch (error) {
      Response.errorMessage(req, res, error.message, 500);
    }
  }

  /**
   * A user should be able to get info on the most traveled destination
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   */
  static async mostTraveledDestination(req, res) {
    try {
      const result = await TripService.getInfoAboutDestination();
      return Response.successMessage(req, res, 'Most traveled destination info retrieved successfully', result, 200);
    } catch (err) {
      return Response.errorMessage(req, res, err.message, 500);
    }
  }

  /**
   * Get all trip types
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   */
  static async getAllTripTypes(req, res) {
    try {
      const tripTypes = await getTripTypes();
      return Response.successMessage(req, res, 'Sucessfully retrieved all the trip types', tripTypes, 200);
    } catch (error) {
      return Response.errorMessage(req, res, error, 500);
    }
  }
}
export default TripController;
