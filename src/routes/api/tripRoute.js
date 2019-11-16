import express from 'express';
import verifyUser from '../../middlewares/verifyUser';
import TripController from '../../controllers/TripController';
import checkOneWayTrip from '../../middlewares/CheckMultiCityTrip';
import validateOneTrip from '../../middlewares/ValidateUser';

const tripRouter = express.Router();

tripRouter.post('/trips/multi-city', verifyUser, validateOneTrip.requestOnewayTripRules(), validateOneTrip.validateSignUp, checkOneWayTrip.checkOnewayData, TripController.requestOnewayTrip);
/**
 * @swagger
 *
 * /user/trips/multi-city:
 *    post:
 *      summary: User can request for one-way trip
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *
 * components:
 *    schemas:
 *      User:
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
 *           location: rwanda
 *           reason: I wanna live there because it is a safe place
 *
 */

export default tripRouter;
