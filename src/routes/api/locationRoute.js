import express from 'express';
import LocationController from '../../controllers/LocationController';
import Validate from '../../middlewares/Validate';
import Conflict from '../../middlewares/Conflict';
import checkInputDataError from '../../middlewares/checkInputDataError';
import isUserVerified from '../../middlewares/isUserVerified';
import verifyToken from '../../middlewares/verifyToken';

const locationRouter = express.Router();
/**
 * @swagger
 *
 * /locations:
 *    post:
 *      summary: A manager can post a location
 *      tags: [Location]
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
 *              $ref: '#/components/schemas/Location'
 *      responses:
 *        "200":
 *          description: A location schema
 *
 * components:
 *    schemas:
 *      Location:
 *        type: object
 *        required:
 *          - location
 *        properties:
 *          location:
 *            type: string
 *        example:
 *           location: Kigali
 *
 */
locationRouter.post(
  '/',
  Validate.locationRules(),
  checkInputDataError,
  Conflict.isCiteisConflict,
  LocationController.saveLocation
);
/**
 * @swagger
 *
 * /locations:
 *    get:
 *      summary: A user can get all location
 *      tags: [Location]
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
 *        required: false
 *      responses:
 *        "200":
 *          description: A location schema
 *        "404":
 *          description: No cities found
 *
 */
locationRouter.get(
  '/',
  verifyToken,
  isUserVerified,
  LocationController.getAllCities
);


export default locationRouter;
