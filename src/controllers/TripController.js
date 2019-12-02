import Customize from '../helpers/Customize';
import { tripRequests, trips } from '../database/models';
import ControllerHelper from '../helpers/ControllerHelper';
import TripService from '../services/TripService';

const { availtripRequestsToManager } = TripService;

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
    ControllerHelper.tripControllerHelper(req, res, 1);
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
    ControllerHelper.tripControllerHelper(req, res, 2);
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
    ControllerHelper.tripControllerHelper(req, res, 3);
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
      const requests = await trips.findAll({
        include: [{
          model: tripRequests,
          where: { userId: req.user.id }
        }],
      });
      return Customize.successMessage(req, res, 'succesfully fetched all  user\'s requests', requests, 200);
    } catch (err) {
      return Customize.errorMessage(req, res, err.message, 500);
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
    return (req.query.status === 'reject')
      ? Customize.successMessage(req, res, 'this request has successfully rejected...', { reason }, 200)
      : Customize.successMessage(req, res, 'this request has successfully accepted...', { reason }, 200);
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
      return Customize.successMessage(req, res, 'Trip edited successfuly', result, 200);
    } catch (err) {
      return Customize.errorMessage(req, res, err.message, 500);
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
        return Customize.errorMessage(req, res, 'No trip requests are available for review', 404);
      }
      return Customize.successMessage(req, res, 'Requests fetched successfully', result, 200);
    } catch (error) {
      return Customize.errorMessage(req, res, 'Oops! internal server error', 500);
    }
  }
}
export default TripController;
