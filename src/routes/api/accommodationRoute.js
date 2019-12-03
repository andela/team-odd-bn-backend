import express from 'express';
import Exists from '../../middlewares/Exists';
import Validate from '../../middlewares/Validate';
import verifyToken from '../../middlewares/verifyToken';
import isUserVerified from '../../middlewares/isUserVerified';
import checkInputDataError from '../../middlewares/checkInputDataError';
import AccomodationMiddleware from '../../middlewares/AccommodationMiddleware';
import AccommodationController from '../../controllers/AccommodationController';


const accommodationRoute = express.Router();
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

accommodationRoute
  .post(
    '/ratings',
    verifyToken,
    Validate.ratingRules(),
    checkInputDataError,
    isAccommodationExist,
    checkforDuplicateRating,
    AccommodationController.createNewRating
  );

/**
* @swagger
*
* /accommodations/{accommodationId}:
*   post:
*     summary: User can add like or dislike a specifc accommodation facility
*     description: user like/dislie
*     tags:
*       - Accommodation
*     parameters:
*      - name: token
*        in: header
*        required: true
*        description: user token
*        schema:
*          $ref: '#/components/schemas/Token'
*      - name: accommodationId
*        in: path
*        required: true
*        description: accommodation id
*        schema:
*          $ref: '#/components/schemas/Id'
*      - name: like
*        in: query
*        required: true
*        description: true for like and false for dislike
*        schema:
*          type: boolean
*     responses:
*       201:
*         description: like or disliked added
*       400:
*         description: Invalid input
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/
accommodationRoute
  .post(
    '/:accommodationId',
    verifyToken,
    isUserVerified,
    Validate.accommodationLikesDislikes(),
    Validate.accommodationId(),
    checkInputDataError,
    Exists.isAccommodationExist,
    AccommodationController.addAccommodationLike
  );

/**
* @swagger
*
* /accommodations/{accommodationId}:
*   get:
*     summary: User get all likes and dislike a specifc accommodation facility
*     description: users likes and dislikes
*     tags:
*       - Accommodation
*     parameters:
*      - name: token
*        in: header
*        required: true
*        description: user token
*        schema:
*          $ref: '#/components/schemas/Token'
*      - name: accommodationId
*        in: path
*        required: true
*        description: accommodation id
*        schema:
*          $ref: '#/components/schemas/Id'
*     responses:
*       200:
*         description: users likes and dislikes retrieved successfully
*       400:
*         description: Invalid input
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/
/**
* @swagger
*  components:
*    schemas:
*      Id:
*        type: integer
*        example: 1
*        minimum: 1
*/
accommodationRoute
  .get(
    '/:accommodationId/likes',
    verifyToken,
    isUserVerified,
    Validate.accommodationId(),
    checkInputDataError,
    Exists.isAccommodationExist,
    AccommodationController.getAccommodationLikes
  );

export default accommodationRoute;
