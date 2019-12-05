import Response from '../helpers/Response';
import AccommodationService from '../services/BookingService';

/**
 * @exports
 * @class BookingController
 */
class BookingController {
  /**
 * users can book an accommodation facility
 * @static
 * @description POST /api/trips/:tripId/booking
 * @param {object} req request object
 * @param {object} res response object
 * @memberof BookingController
 * @returns {object} data
 */
  static async bookAccommodation(req, res) {
    try {
      const result = await AccommodationService.createAccommodationService(req);
      return Response.successMessage(req, res, 'You have booked an accommodation facility successfully', result, 201);
    } catch (error) {
      return Response.errorMessage(req, res, 'Server error', 500);
    }
  }
}
export default BookingController;
