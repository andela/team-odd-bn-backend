import express from 'express';
import verifyToken from '../../middlewares/verifyToken';
import isUserVerified from '../../middlewares/isUserVerified';
import SearchController from '../../controllers/SearchController';
import validateSearchQueries from '../../middlewares/validateSearchQueries';

const searchRoute = express.Router();
const { search } = SearchController;

searchRoute
  .get(
    '/',
    verifyToken,
    validateSearchQueries,
    search
  );
export default searchRoute;
