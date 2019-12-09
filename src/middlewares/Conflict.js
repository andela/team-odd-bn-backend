import DataEngine from './DataEngine';
import {
  cities, users, tripRequests, trips, booking, accommodations
} from '../database/models';

/**
 * @export
 * @class Conflict
 */
class Conflict {
  /**
    * Check if city has conflict
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @param {object} next next
    * @memberof Conflict
    * @returns {object} data
    */
  static isCiteisConflict(req, res, next) {
    return DataEngine.findConflict(req, res, next, cities, { city: req.body.name }, 'The city already exist');
  }

  /**
    * Check if users have conflict user
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @param {object} next next
    * @memberof Conflict
    * @returns {object} data
    */
  static isUsersConflict(req, res, next) {
    return DataEngine.findOne(req, res, next, users, { id: req.params.id }, 'The user already exist');
  }

  /**
    * Check if trip requests exist
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @param {object} next next
    * @memberof Conflict
    * @returns {object} data
    */
  static isTripRequestFound(req, res, next) {
    return DataEngine.findOne(req, res, next, tripRequests, { id: req.params.tripRequestId }, 'The trip request id not found');
  }

  /**
    * Check if trip exist
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @param {object} next next
    * @memberof Conflict
    * @returns {object} data
    */
  static isTripFound(req, res, next) {
    return DataEngine.findOne(req, res, next, trips, { id: req.params.tripId }, 'The trip id not found');
  }

  /**
* check If booking request is already exist
* @static
* @param {object} req request object
* @param {object} res response object
* @param {object} next next
* @memberof Exists
* @returns {object} data
*/
  static isRoomBooked(req, res, next) {
    const { tripId } = req.params;
    const { roomId, checkInDate, checkOutDate } = req.body;
    return DataEngine.findConflict(
      req,
      res,
      next,
      booking,
      {
        tripId: parseInt(tripId, 10),
        roomId: parseInt(roomId, 10),
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate)
      },
      'The accommodation has already booked'
    );
  }

/**
* Check if accomodation already exist
* @static
* @param {object} req request object
* @param {object} res response object
* @param {object} next next
* @memberof Exists
* @returns {object} data
*/
  static checkForDuplicateAccommodation(req, res, next) {
    const {
      name,
      cityId,
      address,
      description,
      googleCoordinates
    } = req.body;

    return DataEngine.findConflict(req, res, next, accommodations,
      {
        name,
        cityId,
        address,
        description,
        googleCoordinates
      }, 'The accommodation already exist.');
  }
}


export default Conflict;
