import Customize from '../helpers/Customize';
import { tripRequests, users } from '../database/models';
import ControllerHelper from '../helpers/ControllerHelper';
import emailHelper from '../helpers/EmailHelper';


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
      return Customize.successMessage(req, res, 'Your request has been approved', '', 201);
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
  static async acceptOrRejectRequests(req, res) {
    const { reason } = req.body;
    return (req.query.status === 'reject')
      ? Customize.successMessage(req, res, 'this request has successfully rejected...', { reason }, 200)
      : Customize.successMessage(req, res, 'this request has successfully accepted...', { reason }, 200);
  }
}

export default TripController;
