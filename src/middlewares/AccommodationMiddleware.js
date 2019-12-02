import Response from '../helpers/Response';
import AccommodationService from '../services/AccommodationService';

const { getUserRating } = AccommodationService;

/**
 * @export
 * @class AccommodationMiddleware
 */
class AccommodationMiddleware {
/**
   *  check for duplicate rating
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Object} if an error exists, returns a bad request error response
   */
  static async checkforDuplicateRating(req, res, next) {
    const userRating = await getUserRating(req);
    if (userRating.length) {
      return Response.errorMessage(req, res, 'Oops! you already submitted a rating', 409);
    }
    return next();
  }
}
export default AccommodationMiddleware;
