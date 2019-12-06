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

  /**
* users can like/dislike a specific accommodation facility
* @static
* @description POST /api/v1/accommodations/:accommodationId?like=true for like OR false for dislike
* @param {object} req request object
* @param {object} res response object
* @memberof AccommodationController
* @returns {object} data
*/
  static async addAccommodationLike(req, res) {
    const addLike = await AccommodationService.addAccommodationLike(req);
    return Response.successMessage(req, res, addLike.displayMessage, addLike.accommodation, 201);
  }

  /**
* users can get likes and dislikes of a specific accommodation facility
* @static
* @description GET /api/v1/accommodations/:accommodationId/likes
* @param {object} req request object
* @param {object} res response object
* @memberof AccommodationController
* @returns {object} data
*/
  static async getAccommodationLikes(req, res) {
    const likesAndDislikes = await AccommodationService.getAccommodationLikes(req);

    return Response.successMessage(req, res, 'All likes and dislikes of this accommodation have been retrieved successfully', likesAndDislikes, 200);
  }
}

export default AccommodationController;
