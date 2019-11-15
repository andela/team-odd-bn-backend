import dotenv from 'dotenv';
import customize from '../helpers/Customize';
import { trips } from '../database/models';

dotenv.config();
/**
 * @export
 * @class TripController
 */
class TripController {
  /**
   * User can be able to request one-way trip
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof UserController
   * @returns {object} data
   */
  static async requestOnewayTrip(req, res) {
    try {
      const loggedUser = req.user.email;
      const { reason, location } = req.body;
      const newTrip = await trips.create({
        email: loggedUser, reason, location, status: 'pending', tripType: 'one-way'
      });
      return customize.successMessage(req, res, 'Trip requested successfully', newTrip, 200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
export default TripController;
