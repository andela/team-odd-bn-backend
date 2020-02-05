import {
  trips,
  accommodations,
  rooms,
  booking,
  tripRequests,
  userProfile,
  accommodationImages,
  cities
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
      const accommodationObj = {
        raw: true
      };
      const isAccommodationExist = await CommonQueries.findAll(
        accommodations,
        accommodationObj
      );
      const availlableRooms = isAccommodationExist.map(async accommodation => {
        const roomObj = {
          where: { accommodationId: accommodation.id },
          raw: true
        };
        const allAvailRoom = await CommonQueries.findAll(rooms, roomObj);
        return allAvailRoom;
      });
      const arrays = await Promise.all(availlableRooms);
      let availlableRoomsArray = [].concat(...arrays);
      availlableRoomsArray = availlableRoomsArray.filter(Boolean);
      const allAvailRoom = availlableRoomsArray;
      const allAvailRoomId = allAvailRoom.map(i => i.id);
      const bookedRoomObj = {
        where: { roomId: allAvailRoomId },
        raw: true
      };
      const isRoomBooked = await CommonQueries.findAll(booking, bookedRoomObj);
      return {
        allAvailRoom,
        isAccommodationExist,
        isRoomBooked
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
    const { id } = req.user;
    const { roomId, checkInDate, checkOutDate } = req.body;

    const bookAccommodationObj = {
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
    const { bookingId: id } = req.params;
    const managerObj = {
      where: { managerId: req.user.id }
    };
    const findOneBookingOb = {
      where: id ? { id, userId: req.user.id } : { userId: req.user.id },
      include: [
        {
          model: rooms,
          include: [{
            model: accommodations,
            include: [{
              model: accommodationImages,
              as: 'imagesAccommodation'
            },
            {
              model: cities,
            }]
          }]
        }
      ]
    };
    const myBookingsresult = await CommonQueries.findAll(
      booking,
      findOneBookingOb
    );
    const res = await CommonQueries.findAll(userProfile, managerObj);
    let managerWatchBookings;
    if (res) {
      managerWatchBookings = res.map(async r => {
        const findOneBookingO = {
          where: id ? { id } : {},
          include: [
            {
              model: rooms,
              include: [{ model: accommodations }]
            }
          ],
          raw: true
        };
        let resul = await CommonQueries.findAll(booking, findOneBookingO);
        resul = resul.filter(
          res => res['trip.tripRequest.userId'] === r.userId
        );
        return resul;
      });
      managerWatchBookings = [].concat(...managerWatchBookings);
      managerWatchBookings = await Promise.all(managerWatchBookings);
      managerWatchBookings = [].concat(...managerWatchBookings);
      managerWatchBookings = managerWatchBookings.filter(Boolean);
    }
    return { myBookingsresult, managerWatchBookings };
  }

  /**
   * Check If s/he is the owner of that trip s/he is booking an accommodation for
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof BookingController
   * @returns {object} data
   */
  static async isOwnerOftheTripService(req, res) {
    try {
      const { tripId } = req.params;
      const i = parseInt(tripId, 10);
      const { id } = req.user;
      const findOneBookingObj = {
        where: { id: i },
        include: [
          {
            model: tripRequests,
            where: { userId: id }
          }
        ],
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
