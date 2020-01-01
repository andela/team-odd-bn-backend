import express from 'express';
import Exists from '../../middlewares/Exists';
import Validate from '../../middlewares/Validate';
import verifyToken from '../../middlewares/verifyToken';
import isUserVerified from '../../middlewares/isUserVerified';
import checkInputDataError from '../../middlewares/checkInputDataError';
import AccomodationMiddleware from '../../middlewares/AccommodationMiddleware';
import AccommodationController from '../../controllers/AccommodationController';
import VerifyUserRoles from '../../middlewares/VerifyUserRoles';
import Conflict from '../../middlewares/Conflict';
import customValidator from '../../middlewares/customValidator';


const accommodationRoute = express.Router();
const { checkforDuplicateRating } = AccomodationMiddleware;
const { isAccommodationExist } = Exists;
const { isImage, isCoordinates } = customValidator;
const { checkForDuplicateAccommodation } = Conflict;
const { createNewAccomodation, getAccommodations } = AccommodationController;

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

/**
 * @swagger
 *
 * /accommodations/:
 *    post:
 *      summary: Travel Admin can post accomodation facilities with their rooms
 *      tags: [Accomodations]
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          description: Travel Admin Token
 *          schema:
 *              $ref: '#/components/schemas/Token'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/accomodations'
 *      responses:
 *        "201":
 *          description: Created
 *        "400":
 *          description: Input error
 *        "401":
 *          description: Unauthorized
 *        "403":
 *          description: Forbiden
 *
 * components:
 *    schemas:
 *      accomodations:
 *        type: object
 *        required:
 *          - name
 *          - cityId
 *          - address
 *          - googleCordinates
 *          - imageUrls
 *          - description
 *          - rooms
 *        properties:
 *          name:
 *            type: string
 *          cityId:
 *            type: integer
 *          address:
 *            type: string
 *          googleCordinates:
 *            type: string
 *          imageUrls:
 *            type: array
 *          description:
 *            type: string
 *          rooms:
 *            type:array
 *        example:
 *           name: dnffd
 *           cityId: 1
 *           address: fname.lname@andela.com
 *           googleCordinates: yourpassword
 *           imageUrls:
 *           - hfn
 *           - jff
 *           description: fnkjndgfkljf
 *           rooms:
 *           - name:78
 *           -  roomType:single
 *
 */
accommodationRoute
  .post(
    '/',
    verifyToken,
    isUserVerified,
    VerifyUserRoles.isTravelAdministrator,
    Validate.checkAccommodationRules(),
    checkInputDataError,
    isCoordinates,
    isImage,
    checkForDuplicateAccommodation,
    createNewAccomodation
  );
/**
 * @swagger
 *
 * /accommodations/:
 *    get:
 *      summary: users can be able to get all accommodation facilities
 *      tags: [Accomodations]
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          description:  Token
 *          schema:
 *              $ref: '#/components/schemas/Token'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/accomodations'
 *      responses:
 *        "201":
 *          description: ok
 *        "400":
 *          description: Input error
 *        "401":
 *          description: Unauthorized
 *        "403":
 *          description: Forbiden
 *
 */
accommodationRoute
  .get(
    '/',
    verifyToken,
    isUserVerified,
    getAccommodations
  );
/**
 * @swagger
 *
 * /accommodations/:
 *    get:
 *      summary: users can get a single accommodation facility
 *      tags: [Accomodations]
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          description: Token
 *          schema:
 *              $ref: '#/components/schemas/Token'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/accomodations'
 *      responses:
 *        "201":
 *          description: ok
 *        "400":
 *          description: Input error
 *        "401":
 *          description: Unauthorized
 *        "403":
 *          description: Forbiden
 */
accommodationRoute
  .get(
    '/:accommodationId',
    verifyToken,
    isUserVerified,
    Validate.isAccommodationIDInteger(),
    checkInputDataError,
    getAccommodations
  );
export default accommodationRoute;
