import sequelize from 'sequelize';
import { ratings } from '../database/models';
import CommonQueries from './CommonQueries';

/**
 * @exports
 * @class AccommodationService
 */
class AccommodationService {
  /**
 * Get user rating
 * @static
 * @description POST /api/accommodations/ratings
 * @param {object} req request object
 * @memberof AccommodationService
 * @returns {object} data
 */
  static async getUserRating(req) {
    const { id: userId } = req.user;
    const { accommodationId } = req.body;
    const userRatingObject = {
      where: {
        userId,
        accommodationId,
      },
    };
    const availableUserRating = CommonQueries.findAll(ratings, userRatingObject);
    return availableUserRating;
  }

  /**
 * users can view total sum rating of that accommodation centre
 * @static
 * @memberof AccommodationService
 * @param {object} req request object
 * @returns {object} data
 */
  static async getRatingSum(req) {
    const totalRatings = await ratings.findOne({
      where: { accommodationId: req.body.accommodationId },
      attributes: ['accommodationId', [sequelize.fn('sum', sequelize.col('rating')), 'totalRating'],
      ],
      group: ['accommodationId']
    });
    return totalRatings;
  }


  /**
 * users can view the rating average of that accommodation centre
 * @static
 * @description POST /api/accommodations/ratings
 * @param {object} req request object
 * @memberof AccommodationService
 * @returns {object} data
 */
  static async getRatingAverage(req) {
    const averageRating = await ratings.findOne({
      where: { accommodationId: req.body.accommodationId },
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
      ],
      group: ['accommodationId']
    });
    const average = parseFloat(averageRating.dataValues.averageRating).toFixed(1);

    return average;
  }

  /**
 * users can rate an accommodation centre
 * @static
 * @description POST /api/accommodations/ratings
 * @param {object} req request object
 * @memberof AccommodationService
 * @returns {object} data
 */
  static async createNewRating(req) {
    const { rating, review, accommodationId } = req.body;
    const { id: userId } = req.user;
    const ratingQueryObject = {
      userId, rating, review, accommodationId,
    };
    const newRating = await CommonQueries.create(ratings, ratingQueryObject);
    const totalRating = await AccommodationService.getRatingSum(req);
    const averageRating = await AccommodationService.getRatingAverage(req);
    newRating.dataValues.totalRatings = totalRating;
    newRating.dataValues.averageRating = averageRating;
    return newRating;
  }
}

export default AccommodationService;
