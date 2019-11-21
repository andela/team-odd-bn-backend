import express from 'express';
import AuthenticateToken from '../../helpers/AuthenticateToken';
import TripController from '../../controllers/TripController';
import validateOneWayTrip from '../../middlewares/ValidateOneWayTrip';
import validateOneTrip from '../../middlewares/ValidateUser';

const tripRouter = express.Router();

tripRouter.post('/oneway', AuthenticateToken.verifyToken, validateOneTrip.requestOnewayTripRules(),
  validateOneTrip.validateSignUp, validateOneWayTrip.validateOnewayData,
  TripController.requestOnewayTrip);

/**
 * @swagger
 *
 * /trips/oneway:
 *    post:
 *      summary: User can request for one-way trip
 *      tags: [Trip]
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

export default tripRouter;
