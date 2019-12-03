import express from 'express';
import verifyToken from '../../middlewares/verifyToken';
import TripController from '../../controllers/TripController';
import ValidateTrip from '../../middlewares/ValidateTrip';
import Validate from '../../middlewares/Validate';
import checkInputDataError from '../../middlewares/checkInputDataError';
import Exists from '../../middlewares/Exists';
import Conflict from '../../middlewares/Conflict';
import isUserVerified from '../../middlewares/isUserVerified';
import { IsOwnerOfTrip, IsTripApproved, isManagerHasAccess, isManagerOwnsRequest } from '../../middlewares/findUsers';
import VerifyUserRoles from '../../middlewares/VerifyUserRoles';
import operateAcceptOrReject from '../../middlewares/approveOrReject';

const tripRouter = express.Router();

const {
  returnTripController,
  OneWayTripController,
  editTrip,
  getRequestsByManager
} = TripController;
const { isTripRequestFound } = Conflict;
const {
  acceptOrRejectRequestsController
} = TripController;


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
 *          - location
 *          - reason
 *        properties:
 *          location:
 *            type: string
 *          reason:
 *            type: string
 *        example:
 *           city: kigali
 *           reason: I wanna live there because it is a safe place
 *           startDate: 2019-11-19 11:11:41.668+02
 *           returnDate: 2019-11-19 11:11:41.668+02
 */

tripRouter
  .post(
    '/oneway',
    verifyToken,
    Validate.requestOnewayTripRules(),
    checkInputDataError,
    ValidateTrip.checkIfOriginDestinationExists,
    ValidateTrip.checkIfOriginSameAsDestination,
    ValidateTrip.checkMultiCityForSimilarRequests,
    ValidateTrip.checkForSimilarRequests,
    ValidateTrip.checkForSimilarRequestsDateRange,
    OneWayTripController
  );


/**
 * @swagger
 *
 * /trips/multicity:
 *    post:
 *      summary: User can request for multi city trip
 *      tags: [Trip]
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          description: user token
 *          schema:
 *              type: string
 *          example: XXXXXXXX.XXXXXXXXXX.XXXXXXX
 *          minimum: 1
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TripMultiCity'
 *      responses:
 *        "201":
 *          description: A Request created
 *        "400":
 *          description: A Bad request
 *        "409":
 *          description: A Conflicting request
 *
 * components:
 *    schemas:
 *      TripMultiCity:
 *        type: object
 *        required:
 *          - location
 *          - reason
 *        properties:
 *          originId:
 *            type: integer
 *          destinationId:
 *            type: integer
 *          startDate:
 *            type: string
 *          returnDate:
 *            type: string
 *          reason:
 *            type: string
 *        example:
 *          itinerary:
 *          - originId: 4
 *            destinationId: 2
 *            startDate: '2029-01-20'
 *            returnDate: '2030-01-10'
 *            reason: Sjkjj
 *          - originId: 4
 *            destinationId: 2
 *            startDate: '2028-11-20'
 *            returnDate: '2030-01-10'
 *            reason: Some other good reasons
 *
 */

tripRouter.post(
  '/multicity',
  verifyToken,
  Validate.requestMultiTripRules(),
  checkInputDataError,
  ValidateTrip.checkIfOriginDestinationExists,
  ValidateTrip.checkIfOriginSameAsDestination,
  ValidateTrip.checkMultiCityForSimilarRequests,
  ValidateTrip.checkForSimilarRequests,
  ValidateTrip.checkForSimilarRequestsDateRange,
  TripController.requestTrip
);

tripRouter
  .post(
    '/twoWay',
    verifyToken,
    Validate.twoWayTripRules(),
    checkInputDataError,
    ValidateTrip.checkIfOriginDestinationExists,
    ValidateTrip.checkIfOriginSameAsDestination,
    ValidateTrip.checkMultiCityForSimilarRequests,
    ValidateTrip.checkForSimilarRequests,
    ValidateTrip.checkForSimilarRequestsDateRange,
    returnTripController
  );

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

tripRouter
  .post(
    '/twoWay',
    verifyToken,
    Validate.twoWayTripRules(),
    checkInputDataError,
    ValidateTrip.checkIfOriginDestinationExists,
    ValidateTrip.checkIfOriginSameAsDestination,
    ValidateTrip.checkMultiCityForSimilarRequests,
    ValidateTrip.checkForSimilarRequests,
    ValidateTrip.checkForSimilarRequestsDateRange,
    returnTripController
  );
tripRouter.get(
  '/requests',
  verifyToken,
  VerifyUserRoles.isManager,
  getRequestsByManager
);

/**
 * @swagger
 *
 * /trips/:id:
 *    get:
 *      summary: Available trip requests
 * /trips/requests:
 *    get:
 *      summary: Available requests to manager for approval
 *      tags: [Trip]
 *      parameters:
 *        - name: token
 *          in: header
 *          description: enter token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Trip requests fetched successfuly
 *        "401":
 *          description: No token provided
 *        "404":
 *          description: Trip requests are not found
 */


tripRouter.get(
  '/',
  verifyToken,
  isUserVerified,
  TripController.getUserRequests
);


/**
 * @swagger
 *
 * /trips/edit/{tripRequestId}:
 *    put:
 *      summary: User should be able to edit trip
 * /trips/{tripRequestId}?status=reject:
 *    patch:
 *      summary: Manager can reject a trip request
 *      tags: [Trip]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TripMultiCity'
 *      parameters:
 *        - name: token
 *          in: header
 *          description: enter user token
 *          required: true
 *          schema:
 *            type: string
 *        - name: id
 *          in: path
 *          description: trip request id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *
 *      responses:
 *        "200":
 *          description: Trip edited successfuly
 *        "400":
 *          description: Bad request
 *        "401":
 *          description: Authentication error
 *
 */

tripRouter
  .put(
    '/edit/:tripRequestId',
    verifyToken,
    isUserVerified,
    Validate.isIDInteger(),
    checkInputDataError,
    Validate.editRequest(),
    checkInputDataError,
    isTripRequestFound,
    IsOwnerOfTrip,
    IsTripApproved,
    ValidateTrip.checkIfOriginDestinationExists,
    ValidateTrip.checkIfOriginSameAsDestination,
    ValidateTrip.checkMultiCityForSimilarRequests,
    editTrip
  );


/**
 * @swagger
 *
 * /trips/{tripRequestId}?status=reject:
 *    patch:
 *      summary: Manager can reject a trip request
 *      tags: [Trip]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Trip'
 *      parameters:
 *        - name: tripRequestId
 *          in: path
 *          description: Please enter the valid status
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: A user schema
 *        "403":
 *          description: A user schema
 *        "409":
 *          description: A user schema
 *        "404":
 *          description: A user schema
 *
 * /trips/{tripRequestId}?status=accept:
 *    patch:
 *      summary: Manager can reject a trip request
 *      tags: [Trip]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Trip'
 *      parameters:
 *        - name: tripRequestId
 *          in: path
 *          description: Please enter the valid status
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: A user schema
 *        "403":
 *          description: A user schema
 *        "409":
 *          description: A user schema
 *        "404":
 *          description: A user schema
 *
 * components:
 *    schemas:
 *      Trip:
 *        type: object
 *        required:
 *          - reason
 *        properties:
 *          reason:
 *            type: string
 */

tripRouter
  .patch(
    '/:tripRequestId',
    verifyToken, Validate.approveOrRejectRequest(),
    checkInputDataError, Exists.isTripRequestExist,
    isManagerOwnsRequest, isManagerHasAccess,
    operateAcceptOrReject, acceptOrRejectRequestsController
  );

export default tripRouter;
