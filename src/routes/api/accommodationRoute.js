import express from 'express';
import AccommodationController from '../../controllers/AccommodationController';
import verifyToken from '../../middlewares/verifyToken';
import Validate from '../../middlewares/Validate';
import checkInputDataError from '../../middlewares/checkInputDataError';
import AccomodationMiddleware from '../../middlewares/AccommodationMiddleware';
import Exists from '../../middlewares/Exists';

const accomodationRouter = express.Router();
const { checkforDuplicateRating } = AccomodationMiddleware;
const { isAccommodationExist } = Exists;
/**
 * @swagger
 *
 * /accommodations/ratings:
 *    post:
 *      summary: User can rate an accomodation
 *      tags: [Accommodations]
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          description: Please input user token
 *          schema:
 *              type: string
 *          example: XXXXXXXX.XXXXXXXXXX.XXXXXXX
 *          minimum: 1
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/rateAccomodation'
 *      responses:
 *        "201":
 *          description: Created
 *        "400":
 *          description: Input error
 *        "401":
 *          description: Unauthorized
 *        "403":
 *          description: Forbidden
 *
 * components:
 *    schemas:
 *      rateAccomodation:
 *        type: object
 *        required:
 *          - rating
 *          - review
 *          - accommodationId
 *        properties:
 *          rating:
 *            type: integer
 *          review:
 *            type: string
 *          accommodationId:
 *            type: integer
 *        example:
 *           rating: 4
 *           review: Nice ambience and food
 *           accommodationId: 1
 *
 */

accomodationRouter
  .post(
    '/ratings',
    verifyToken,
    Validate.ratingRules(),
    checkInputDataError,
    isAccommodationExist,
    checkforDuplicateRating,
    AccommodationController.createNewRating
  );

export default accomodationRouter;
