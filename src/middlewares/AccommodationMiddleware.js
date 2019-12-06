import Response from '../helpers/Response';
import AccommodationService from '../services/AccommodationService';
import BookingService from '../services/BookingService';

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

  /**
   *  check for an accommodation if exist
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Object} errors
   */
  static async isAccommodationAvail(req, res, next) {
    const { checkInDate, roomId } = req.body;
    const serviceQueries = await BookingService.bookAccommodationService(req, res);
    const {
      isAccommodationExist, allAvailRoom, isRoomBooked
    } = serviceQueries;

    const allAvailRoomId = allAvailRoom.map(i => i.id);
    const isRoomExist = allAvailRoomId.includes(parseInt(roomId, 10));
    if (!isRoomExist) {
      return Response.errorMessage(req, res, 'Room is not available', 404);
    }
    let isBookable;
    isRoomBooked.forEach(x => {
      if (new Date(x.checkOutDate) > new Date(checkInDate)) { isBookable = true; }
    });

    if (isBookable) {
      return Response.errorMessage(req, res, 'Room booked by other client', 403);
    }
    if (!isAccommodationExist) {
      return Response.errorMessage(req, res, 'Sorry, the destination of your trip request does not have available accommodation', 404);
    }
    next();
  }
}

export default AccommodationMiddleware;
