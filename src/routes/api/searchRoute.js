import express from 'express';
import verifyToken from '../../middlewares/verifyToken';
import isUserVerified from '../../middlewares/isUserVerified';
import SearchController from '../../controllers/SearchController';
import validateSearchQueries from '../../middlewares/validateSearchQueries';

const searchRoute = express.Router();

const { searchedByPreference } = SearchController;

/**
* @swagger
*
* /search:
*   get:
*     summary: User can get trips searched by the preference.
*     description: user can search trips by originId, destinationId,
*      status, trip type,trip owner's first name
*     tags:
*       - Search
*     parameters:
*      - name: token
*        in: header
*        required: true
*        description: user token
*        schema:
*          $ref: '#/components/schemas/Search'
*      - name: searchPreference
*        in: path
*        required: true
*        description: search trips by originId, destinationId,
*        status, trip type,trip owner's first name
*        schema:
*          $ref: '#/components/schemas/Search'
*      - name: search query key
*        in: query
*        required: true
*        description: search trips by originId, destinationId,
*        status, trip type,trip owner's first name
*        schema:
*          type: string
*     responses:
*       200:
*         description: Successfully retrieved trip requests by that search query parameter
*       401:
*         description: Unauthorized
*       400:
*         description: Bad Request
*       403:
*         description: Forbidden
*       500:
*         description: Internal server error
*/

searchRoute
  .get(
    '/',
    verifyToken,
    isUserVerified,
    validateSearchQueries,
    searchedByPreference,
  );
export default searchRoute;
