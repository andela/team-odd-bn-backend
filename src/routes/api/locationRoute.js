import express from 'express';
import LocationController from '../../controllers/LocationController';
import Validate from '../../middlewares/Validate';
import Conflict from '../../middlewares/Conflict';
import checkInputDataError from '../../middlewares/checkInputDataError';

const locationRouter = express.Router();

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
 *    post:
 *      summary: A manager can post a location
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

export default locationRouter;
