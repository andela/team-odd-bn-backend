import Response from '../helpers/Response';
import { tripRequests, users } from '../database/models';
import TripHelper from '../helpers/TripHelper';
import emailHelper from '../helpers/EmailHelper';
import TripService from '../services/TripService';

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
   * Manager should be able to approve a trip
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof TripController
   * @returns {object} data
   */
  static async approveTrip(req, res) {
    try {
      const user = await users.findOne({ where: { id: req.row.userId }, raw: true });
      emailHelper.approvedEmailHelper(user);
      await tripRequests.update({ statusId: 2 }, {
        where: {
          id: req.params.id
        }
      });
      return Response.successMessage(req, res, 'Your request has been approved', '', 201);
    } catch (err) {
      return Response.errorMessage(req, res, err.message, 500);
    }
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
      const requests = await TripService.getUserRequests(req);
      return Response.successMessage(req, res, 'succesfully fetched all  user\'s requests', requests, 200);
    } catch (err) {
      return Response.errorMessage(req, res, err.message, 500);
    }
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
      return Response.successMessage(req, res, 'Trip edited successfuly', result, 200);
    } catch (err) {
      return Response.errorMessage(req, res, err.message, 500);
    }
  }
}

export default TripController;
