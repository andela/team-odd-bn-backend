import Sequelize from 'sequelize';
import {
  accommodations, rooms, accommodationImages, ratings, likes, sequelize, cities, users, userProfile
} from '../database/models';
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
      attributes: ['accommodationId', [Sequelize.fn('sum', Sequelize.col('rating')), 'totalRating'],
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
      attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
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

    const accommodation = await CommonQueries.findOne(
      accommodations, { where: { id: accommodationId } }
    );
    const isLikedOrDisliked = await CommonQueries.findOne(
      likes,
      { where: { userId: id, accommodationId } }
    );
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
      if (like && !liked && disliked) {
        setObject = { disliked: false, liked: true };
        displayMessage = 'You liked this accommodation!';
      }
      if (!liked && !disliked) {
        setObject = { liked: like, disliked: !like };
        displayMessage = like ? 'You liked this accommodation!' : 'You disliked this accommodation!';
      }

      const updateLikeObject = [setObject, { where: { userId: id, accommodationId } }];

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

  /**
   * Travel Admin can be able to create accomodation
   * @static
   * @param {object} req  request object
   * @memberof AccommodationService
   * @returns {object} data
   */
  static async createAccomodation(req) {
    const { id: userId } = req.user;
    const {
      name,
      cityId,
      address,
      description,
      googleCoordinates,
      imageUrls,
      rooms: userRooms,
    } = req.body;
    const newAccommodationObject = {
      userId,
      name,
      cityId,
      address,
      description,
      googleCoordinates,
    };
    const newAccommodation = await CommonQueries.create(accommodations, newAccommodationObject);
    let createdImageUrls;
    await sequelize.transaction(async () => {
      createdImageUrls = Array.from(new Set(imageUrls)).map(async (imageUrl) => {
        const createdImageUrl = await CommonQueries.create(accommodationImages,
          { accommodationId: newAccommodation.id, imageUrl });
        return createdImageUrl.dataValues;
      });
      createdImageUrls = await Promise.all(createdImageUrls);
      createdImageUrls = [].concat(...createdImageUrls);
    });


    const roomSet = [...new Set(userRooms.map(room => room))];
    let createdRooms;
    await sequelize.transaction(async () => {
      createdRooms = roomSet.map(async (room) => {
        room.accommodationId = newAccommodation.id;
        const createdRoom = await CommonQueries.create(rooms, room);
        return createdRoom.dataValues;
      });
      createdRooms = await Promise.all(createdRooms);
      createdRooms = [].concat(...createdRooms);
    });
    newAccommodation.dataValues.imageUrls = createdImageUrls;
    newAccommodation.dataValues.rooms = createdRooms;
    return newAccommodation;
  }

  /**
   * Get single/all accommodations
   * @static
   * @param {object} req  request object
   * @memberof AccommodationService
   * @returns {object} data
   */
  static async getAccommodations(req) {
    const getAccommodationsQueryObject = req.params.accommodationId
      ? {
        where: { id: req.params.accommodationId },
        include: [{
          model: rooms,
          as: 'accommodationRooms',
        }, {
          model: cities,
        },
        { model: accommodationImages, as: 'imagesAccommodation' },
        {
          model: ratings,
          as: 'ratings',
          include: [{
            model: users,
            as: 'users',
            attributes: ['id', 'firstName', 'lastName', 'email', 'roleId'],
            include: [{
              model: userProfile,
              as: 'userProfile',
            }]
          }]
        }]
      }
      : {
        include: [{
          model: rooms, as: 'accommodationRooms'
        }, { model: accommodationImages, as: 'imagesAccommodation' },
        {
          model: ratings,
          as: 'ratings',
          include: [{
            model: users,
            as: 'users',
            attributes: ['id', 'firstName', 'lastName', 'email', 'roleId'],
            include: [{
              model: userProfile,
              as: 'userProfile',
            }]
          }]
        },
        { model: cities }]
      };
    const result = await CommonQueries.findAll(accommodations, getAccommodationsQueryObject);
    return result;
  }
}

export default AccommodationService;
