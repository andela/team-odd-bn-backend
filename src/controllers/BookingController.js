import Response from '../helpers/Response';
import AccommodationService from '../services/BookingService';
import NotificationService from '../services/NotificationService';

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
      req.result = result;
      await NotificationService.newBookingNotification(req);
      return Response.successMessage(req, res, 'You have booked an accommodation facility successfully', result, 201);
    } catch (error) {
      return Response.errorMessage(req, res, 'Server error', 500);
    }
  }
}
export default BookingController;
