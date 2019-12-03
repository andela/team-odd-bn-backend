import sequelize from 'sequelize';
import { ratings, likes, accommodations } from '../database/models';
import CommonQueries from './CommonQueries';

/**
 * @export
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

  /**
 * user POST likes/dislikes accommodation facility
 * @static
 * @param {object} req pass request body
 * @memberof AccommodationService
 * @returns {object} either an error or data
 */
  static async addAccommodationLike(req) {
    let setObject, displayMessage;
    let { like } = req.query;
    const { accommodationId } = req.params;
    const { id } = req.user;
    like = JSON.parse(like);

    const accommodation = await CommonQueries.findOne(accommodations, { where: { id: accommodationId } });
    const isLikedOrDisliked = await CommonQueries.findOne(likes, { where: { userId: id } });

    if (isLikedOrDisliked) {
      const { liked, disliked } = isLikedOrDisliked.dataValues;

      if (like && liked && !disliked) {
        setObject = { liked: false };
        displayMessage = 'You unliked this accommodation!';
      }
      if (!like && !liked && disliked) {
        setObject = { disliked: false };
        displayMessage = 'You un-disliked this accommodation!';
      }
      if (!like && liked && !disliked) {
        setObject = { disliked: true, liked: false };
        displayMessage = 'You disliked this accommodation!';
      }
      if (!liked && !disliked) {
        setObject = { liked: like, disliked: !like };
        displayMessage = like ? 'You liked this accommodation!' : 'You disliked this accommodation!';
      }

      const updateLikeObject = [setObject, { where: { userId: id } }];

      await CommonQueries.update(likes, updateLikeObject);
    } else {
      const addLikeObject = {
        userId: id,
        accommodationId,
        liked: like,
        disliked: !like
      };
      await CommonQueries.create(likes, addLikeObject);
      displayMessage = like ? 'You liked this accommodation!' : 'You disliked this accommodation!';
    }
    return { displayMessage, accommodation };
  }

  /**
   * user GET likes/dislikes accommodation facility
   * @static
   * @param {object} req pass request body
   * @memberof AccommodationService
   * @returns {object} either an error or data
   */
  static async getAccommodationLikes(req) {
    const { accommodationId } = req.params;
    const likeCounter = await CommonQueries.count(likes, {
      where: {
        accommodationId,
        liked: true
      },
    });
    const dislikeCounter = await CommonQueries.count(likes, {
      where: {
        accommodationId,
        disliked: true
      }
    });
    return { likeCounter, dislikeCounter };
  }
}

export default AccommodationService;
