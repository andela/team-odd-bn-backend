import _ from 'lodash';
import Response from '../helpers/Response';
import { cities, tripRequests, trips } from '../database/models';
/**
 * @export
 * @class ValidateTrip
 */
export default class ValidateTrip {
/**
   * checkIfOriginDestinationExists
   * @static
   * @param {object} req response Object
   * @param {object} res request Object
   * @param {object} next next
   * @memberof ValidateTrip
   * @returns {object} data
   */
  static async checkIfOriginDestinationExists(req, res, next) {
    const itinerary = req.body.itinerary ? req.body.itinerary : [req.body];

    const allCities = await cities.findAll({ attributes: ['id'], raw: true, });
    const userCitiesArr = [];
    const AllCitiesArr = allCities.map(singleCity => singleCity.id);
    itinerary
      .forEach(singleCity => userCitiesArr.push(singleCity.originId, singleCity.destinationId));
    const cityExist = userCitiesArr.every((val) => AllCitiesArr.indexOf(val) !== -1);

    if (!cityExist) {
      return Response.errorMessage(req, res, 'Location  not exist', 404);
    }

    next();
  }

  /**
   * checkIfOriginSameAsDestination
   * @static
   * @param {object} req response Object
   * @param {object} res request Object
   * @param {object} next next
   * @memberof ValidateTrip
   * @returns {object} data
   */
  static async checkIfOriginSameAsDestination(req, res, next) {
    const itinerary = req.body.itinerary ? req.body.itinerary : [req.body];

    const checkDateOriginDestination = {};

    itinerary.forEach((item) => {
      const startdate = new Date(item.startDate);
      const returndate = new Date(item.returnDate);
      if (startdate > returndate) {
        checkDateOriginDestination.message = 'ReturnDate should be greater than start date';
        checkDateOriginDestination.date = true;
      } if (item.originId === item.destinationId) {
        checkDateOriginDestination.message = 'Orign should not be same as destination';
        checkDateOriginDestination.originDestination = true;
      }
    });

    if (checkDateOriginDestination.date || checkDateOriginDestination.originDestination) {
      return Response.errorMessage(req, res, checkDateOriginDestination.message, 400);
    }


    next();
  }

  /**
   * checkMultiCityForSimilarRequests
   * @static
   * @param {object} req response Object
   * @param {object} res request Object
   * @param {object} next next
   * @memberof ValidateTrip
   * @returns {object} data
   */
  static async checkMultiCityForSimilarRequests(req, res, next) {
    const itinerary = req.body.itinerary ? req.body.itinerary : [req.body];
    const checkSimilarRequests = {};
    itinerary.forEach((item) => {
      itinerary.forEach((i) => {
        const dd = _.isEqual(
          { o: item.originId, p: item.destinationId },
          { o: i.originId, p: i.destinationId }
        );
        if (itinerary.indexOf(i) !== itinerary.indexOf(item) && dd) {
          checkSimilarRequests.similar = true;
        }
      });
    });


    if (checkSimilarRequests.similar) {
      return Response.errorMessage(req, res, 'You are passing similar request', 400);
    }


    next();
  }

  /**
   * checkForSimilarRequests
   * @static
   * @param {object} req response Object
   * @param {object} res request Object
   * @param {object} next next
   * @memberof ValidateTrip
   * @returns {object} data
   */
  static async checkForSimilarRequests(req, res, next) {
    const itinerary = req.body.itinerary ? req.body.itinerary : [req.body];

    const allCitiess = await trips.findAll({
      include: [{
        model: tripRequests,
        where: { userId: req.user.id, statusId: 1 }
      }],
      raw: true,
    });
    const allPendingRequests = allCitiess.map((i) => {
      const a = JSON.parse(JSON.stringify(i)).originId;
      const b = JSON.parse(JSON.stringify(i)).destinationId;

      return { a, b };
    });

    const AllUserRequests = itinerary.map((singleCity) => {
      const a = singleCity.originId;
      const b = singleCity.destinationId;
      return { a, b };
    });
    const object = {};
    allPendingRequests.forEach((item) => {
      AllUserRequests.forEach((i) => {
        const dd = _.isEqual(i, item);
        if (dd) {
          object.object = true;
        }
      });
    });

    if (object.object) {
      return Response.errorMessage(req, res, 'Similar request exist', 409);
    }

    next();
  }

  /**
   * checkForSimilarRequestsDateRange
   * @static
   * @param {object} req response Object
   * @param {object} res request Object
   * @param {object} next next
   * @memberof ValidateTrip
   * @returns {object} data
   */
  static async checkForSimilarRequestsDateRange(req, res, next) {
    const itinerary = req.body.itinerary ? req.body.itinerary : [req.body];
    const object = {};
    const allCitiess = await trips.findAll({
      include: [{
        model: tripRequests,
        where: { userId: req.user.id, statusId: 1 }
      }],
      raw: true,
    });
    allCitiess.forEach((item) => {
      itinerary.forEach((i) => {
        if (item.startDate <= i.startDate && item.returnDate >= i.returnDate) {
          object.object = true;
        }
      });
    });

    if (object.object) {
      return Response.errorMessage(req, res, 'Similar trip exists within this range.', 409);
    }

    next();
  }
}
