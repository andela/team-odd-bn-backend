import {
  trips, accommodations, rooms, booking, tripRequests
} from '../database/models';
import CommonQueries from './CommonQueries';
import Response from '../helpers/Response';


/**
 * @exports
 * @class BookingController
 */
class BookingService {
  /**
 * users should be able to booking an accommodation facility
 * @static
 * @description POST /api/trips/:tripId/booking
 * @param {object} req request object
 * @param {object} res response object
 * @memberof BookingController
 * @returns {object} data
 */
  static async bookAccommodationService(req, res) {
    try {
      const { tripId } = req.params;
      const tripObj = {
        where: { id: tripId }, raw: true
      };
      const getTrip = await CommonQueries.findOne(trips, tripObj);
      const { destinationId } = getTrip;

      const accommodationObj = {
        where: { cityId: destinationId }, raw: true
      };
      const isAccommodationExist = await CommonQueries.findAll(accommodations, accommodationObj);

      const roomObj = {
        where: { accommodationId: isAccommodationExist[0].id },
        raw: true
      };

      const allAvailRoom = await CommonQueries.findAll(rooms, roomObj);
      const allAvailRoomId = allAvailRoom.map(i => i.id);
      const bookedRoomObj = {
        where: { roomId: allAvailRoomId }, raw: true
      };
      const isRoomBooked = await CommonQueries.findAll(booking, bookedRoomObj);
      return {
        allAvailRoom,
        isAccommodationExist,
        getTrip,
        isRoomBooked,
      };
    } catch (error) {
      return Response.errorMessage(req, res, error.message, 500);
    }
  }

  /**
 * create an accommodation request
 * @static
 * @param {object} req request object
 * @param {object} res response object
 * @memberof BookingController
 * @returns {object} data
 */
  static async createAccommodationService(req) {
    const { tripId } = req.params;
    const { id } = req.user;
    const { roomId, checkInDate, checkOutDate } = req.body;

    const bookAccommodationObj = {
      tripId,
      userId: id,
      roomId: parseInt(roomId, 10),
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate)

    };
    const result = await CommonQueries.create(booking, bookAccommodationObj);
    return result;
  }

  /**
 * As Manager can get all accommodation request made
 * @static
 * @param {object} req request object
 * @param {object} res response object
 * @memberof BookingController
 * @returns {object} data
 */
  static async getAllBookingReqService() {
    const result = await CommonQueries.findAll(booking);
    return result;
  }

  /**
 * As Manager can get specific accommodation request made
 * @static
 * @param {object} req request object
 * @param {object} res response object
 * @memberof BookingController
 * @returns {object} data
 */
  static async getUserBookingReqService(req) {
    const { userId } = req.params;
    const findOneBookingObj = {
      where: { userId }, raw: true
    };

    const result = !userId ? await CommonQueries.findAll(booking) : await CommonQueries.findAll(booking, findOneBookingObj);
    return result;
  }

  /**
 * Check If s/he is the owner of that trip s/he is booking an accommodation for
 * @static
 * @param {object} req request object
 * @param {object} res response object
 * @memberof BookingController
 * @returns {object} data
 */
  static async isOwnerOftheTripService(req) {
    try {
      const { tripId } = req.params;
      const i = parseInt(tripId, 10);
      const { id } = req.user;
      const findOneBookingObj = {
        where: { id: i },
        include: [{
          model: tripRequests,
          where: { userId: id }
        }],
        raw: true
      };
      const result = await CommonQueries.findAll(trips, findOneBookingObj);

      return result;
    } catch (error) {
      return Response.errorMessage(req, res, error.message, 500);
    }
  }
}
export default BookingService;
