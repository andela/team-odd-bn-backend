import { tripRequests } from '../database/models';
/**
 * Find a specific user.
 * @param {object} object The user object.
 * @returns {object} A specific user object.
 */
class Trip {
  /**
   * email templates
   * @static
   * @param {Object} object user object
   * @returns {Object} an existing user
   */
  static async getAllTripRequests(object) {
    return tripRequests.findAll({
      where: object
    }).then(request => request);
  }
}

export default Trip;
