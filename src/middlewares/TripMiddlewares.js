import Customize from '../helpers/Customize';
import TripService from '../services/TripService';
import database from '../database/models';

const { getAllTripRequests } = TripService;
/**
 * @export
 * @class TripMiddlewares
 */
class TripMiddleware {
  /**
   *  trip exists validation middleware
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Object} if an error exists, returns a bad request error response
   */
  static async checkifOriginIdExists(req, res, next) {
    const cityRequest = await database.cities.findOne({ where: { id: req.body.originId } });
    if (!cityRequest) {
      return Customize.errorMessage(req, res, 'Oops! originId doesn\'t exist!', 404);
    }
    return next();
  }

  /**
   *  trip exists validation middleware
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Object} if an error exists, returns a bad request error response
   */
  static async checkifDestinationIdExists(req, res, next) {
    const cityRequest = await database.cities.findOne({ where: { id: req.body.destinationId } });
    if (!cityRequest) {
      return Customize.errorMessage(req, res, 'Destination Id cannot be found!', 404);
    }
    return next();
  }

  /**
   *  trip exists validation middleware
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Object} if an error exists, returns a bad request error response
   */
  static async checkifReturnDateisLess(req, res, next) {
    const { startDate, returnDate } = req.body;
    const startingDate = new Date(startDate);
    const returningDate = new Date(returnDate);
    if (returningDate < startingDate) {
      return Customize.errorMessage(req, res, 'Oops! return date cannot be less than start date', 400);
    }
    return next();
  }

  /**
   *  trip exists validation middleware
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Object} if an error exists, returns a bad request error response
   */
  static async IsOriginAndDestinationSimilar(req, res, next) {
    const { originId, destinationId } = req.body;
    const originTypeId = parseInt(originId, 10);
    const destinationTypeId = parseInt(destinationId, 10);
    if (originTypeId === destinationTypeId) {
      return Customize.errorMessage(req, res, 'Please check your destination. Origin and destination should not be similar', 400);
    }
    return next();
  }

  /**
   *  trip exists validation middleware
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Object} if an error exists, returns a bad request error response
   */
  static async checkIfTripExists(req, res, next) {
    const { id } = req.user;
    const userRequests = await getAllTripRequests({ userId: id });
    const tripRequestArray = userRequests.map(userRequest => userRequest.id);
    const cities = await database.tripRequestCities.findAll({
      where: {
        tripRequestId: tripRequestArray,
      }
    });
    const { startDate, returnDate } = req.body;
    const startingDate = new Date(startDate);
    const returningDate = new Date(returnDate);

    const userRequestMap = cities.map(request => {
      const startDateRange = startingDate >= request.dataValues.startDate
      && startingDate <= request.dataValues.returnDate;
      const returnDateRange = returningDate >= request.dataValues.startDate
      && returningDate <= request.dataValues.returnDate;
      if (startDateRange || returnDateRange) {
        return true;
      }
      return false;
    });
    if (userRequestMap.some(val => val === true)) {
      return Customize.errorMessage(req, res, 'Oops!! You already have a scheduled trip during this duration', 409);
    }

    return next();
  }
}

export default TripMiddleware;
