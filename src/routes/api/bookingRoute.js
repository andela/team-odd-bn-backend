import express from 'express';
import BookingController from '../../controllers/BookingController';
import verifyToken from '../../middlewares/verifyToken';
import Conflict from '../../middlewares/Conflict';
import AccommodationMiddleware from '../../middlewares/AccommodationMiddleware';
import Validate from '../../middlewares/Validate';
import checkInputDataError from '../../middlewares/checkInputDataError';
import ValidateAccommodation from '../../middlewares/ValidateAccommodation';
import isUserVerified from '../../middlewares/isUserVerified';
import { isManagerHasAccess } from '../../middlewares/findUsers';

const { checkIfCheckInDateIsAsCheckOutDate } = ValidateAccommodation;
const bookingRouter = express.Router();
const { isTripFound, isRoomBooked } = Conflict;

/**
 * @swagger
 *
 * /trips/{tripId}/booking:
 *    post:
 *      summary: User can book an accommodation
 *      tags: [Booking]
*      parameters:
 *        - name: tripId
 *          in: path
 *          description: Please enter the valid trip id
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Booking'
 *      responses:
 *        "200":
 *          description: Ok
 *        "201":
 *          description: Accommodation facility created successfully
 *        "400":
 *          description: Bad request
 *        "401":
 *          description: Accommodation room booked by another
 *        "404":
 *          description: Accommodation not found
 *        "500":
 *          description: Server Error
 *
 * components:
 *    schemas:
 *      Booking:
 *        type: object
 *        required:
 *          - roomId
 *          - checkInDate
 *          - checkOutDate
 *        properties:
 *          roomId:
 *            type: integer
 *          checkInDate:
 *            type: string
 *          checkOutDate:
 *            type: string
 *        example:
 *           roomId: 3
 *           checkInDate: 2019-11-19
 *           checkOutDate: 2019-11-19 11:11:41.668+02
 */


bookingRouter.post('/:tripId/booking', verifyToken, isUserVerified, isTripFound, Validate.bookAccommodationRules(), checkInputDataError, checkIfCheckInDateIsAsCheckOutDate, isRoomBooked, AccommodationMiddleware.isAccommodationAvail, BookingController.bookAccommodation);

/**
 * @swagger
 *
 * /trips/booking:
 *    get:
 *      summary: Manager can get all booking requests
 *      tags: [Booking]
 *      responses:
 *        "200":
 *          description: Ok
 *        "400":
 *          description: Bad request
 *        "404":
 *          description: Booking request not found
 *        "500":
 *          description: Server Error
 */

bookingRouter.get('/booking', verifyToken, isUserVerified, isManagerHasAccess, BookingController.getUserBookingRequests);
/**
 * @swagger
 *
 * /trips/booking/{userId}:
 *    get:
 *      summary: Manager can get specific booking requests
 *      tags: [Booking]
*      parameters:
 *        - name: userId
 *          in: path
 *          description: Please enter the valid user id
 *          required: false
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: Ok
 *        "400":
 *          description: Bad request
 *        "404":
 *          description: Booking request not found
 *        "500":
 *          description: Server Error
 */

bookingRouter.get('/booking/:userId', verifyToken, isUserVerified, isManagerHasAccess, BookingController.getUserBookingRequests);


export default bookingRouter;
