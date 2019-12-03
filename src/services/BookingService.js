import {
  trips, accommodations, rooms, booking
} from '../database/models';
import CommonQueries from './CommonQueries';


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
 * @memberof CommentController
 * @returns {object} data
 */
  static async bookAccommodationService(req) {
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
      const isAccommodationExist = await CommonQueries.findOne(accommodations, accommodationObj);

      const roomObj = {
        where: { accommodationId: isAccommodationExist.cityId },
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
      console.log('error', error);
    }
  }

  /**
 * create an accommodation request
 * @static
 * @param {object} req request object
 * @param {object} res response object
 * @memberof CommentController
 * @returns {object} data
 */
  static async createAccommodationService(req) {
    const { tripId } = req.params;
    const { roomId, checkInDate, checkOutDate } = req.body;
    const bookAccommodationObj = {
      tripId,
      roomId: parseInt(roomId, 10),
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate)
    };
    const result = await CommonQueries.create(booking, bookAccommodationObj);
    return result;
  }
}
export default BookingService;
