import express from 'express';
import AuthenticateToken from '../../helpers/AuthenticateToken';
import TripController from '../../controllers/TripController';
import checkInputDataError from '../../middlewares/checkInputDataError';
import Validate from '../../middlewares/Validate';
import TripMiddleware from '../../middlewares/TripMiddlewares';

const tripRouter = express.Router();
const { verifyToken } = AuthenticateToken;

const {
  checkifOriginIdExists,
  checkifDestinationIdExists,
  IsOriginAndDestinationSimilar,
  checkifReturnDateisLess,
  checkIfTripExists
} = TripMiddleware;

const { returnTripController, OneWayTripController } = TripController;

tripRouter.post('/oneway',
  verifyToken,
  Validate.oneWayTripRules(),
  checkInputDataError,
  checkifOriginIdExists,
  checkifDestinationIdExists,
  IsOriginAndDestinationSimilar,
  checkIfTripExists,
  OneWayTripController);


/**
 * @swagger
 *
 * /trips/oneway:
 *    post:
 *      summary: User can request for one-way trip
 *      tags: [Trip]
 * /trips/twoWay:
 *    post:
 *      summary: User can request for a roundtrip
 *      tags: [Trips]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Trip'
 *      responses:
 *        "200":
 *          description: A user schema
 *
 * components:
 *    schemas:
 *      Trip:
 *        type: object
 *        required:
 *          - city
 *          - reason
 *          - startDate
 *        properties:
 *          city:
 *            type: integer
 *          reason:
 *            type: string
 *          startDate:
 *            type: string
 *
 */

tripRouter.post('/twoWay',
  verifyToken,
  Validate.twoWayTripRules(),
  checkInputDataError,
  checkifReturnDateisLess,
  checkifOriginIdExists,
  checkifDestinationIdExists,
  IsOriginAndDestinationSimilar,
  checkIfTripExists,
  returnTripController);

/**
 * @swagger
 * /trips/twoWay:
 *    post:
 *      summary: User can request for a roundtrip
 *      tags: [Trip]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ReturnTrip'
 *      parameters:
 *        - name: token
 *          in: header
 *          description: Please enter your token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "201":
 *          description: Trip was requested successfully
 *        "400":
 *          description: Bad request
 *        "403":
 *          description: Forbiden request
 * components:
 *   schemas:
 *     ReturnTrip:
 *       type: "object"
 *       properties:
 *         originId:
 *           type: integer
 *           example: It should be an integer e.g 1,2,3
 *         destinationId:
 *           type: integer
 *           example: It should be an integer e.g 1,2,3
 *         reason:
 *           type: string
 *           example: It should be a string e.g Going to meet department heads
 *         tripTypeId:
 *           type: integer
 *           example: It should be an integer of either 1,2 or 3
 *         startDate:
 *           type: string
 *           example: It should follow the correct format of YY-MM-DDD
 *         returnDate:
 *           type: string
 *           example: It should follow the correct format of YY-MM-DDD
 *       required:
 *         - 'originId'
 *         - 'destinationId'
 *         - 'reason'
 *         - 'tripTypeId'
 *         - 'startDate'
 *         - 'returnDate'
 *
 */

export default tripRouter;
