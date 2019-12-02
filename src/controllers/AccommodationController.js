import Response from '../helpers/Response';
import AccommodationService from '../services/AccommodationService';

const { createNewRating } = AccommodationService;

/**
 * @export
 * @class AccomodationController
 */
class AccommodationController {
  /**
   * User can be able rate an accomodation
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof AccommodationController
   * @returns {object} data
   */
  static async createNewRating(req, res) {
    try {
      const result = await createNewRating(req);
      return Response.successMessage(req, res, 'You have successfully rated this accomodation', result, 201);
    } catch (err) {
      return Response.errorMessage(req, res, err.message, 500);
    }
  }
}

export default AccommodationController;
