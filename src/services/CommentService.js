import { comments, users } from '../database/models';
import CommonQueries from './CommonQueries';

/**
 * @exports
 * @class CommentService
 */
class CommentService {
  /**
 * users or managers can comment on a travel request
 * @static
 * @description POST /api/users/:tripRequestId/comment
 * @param {object} req request object
 * @memberof CommentService
 * @returns {object} data
 */
  static async createComment(req) {
    const { tripRequestId } = req.params;
    const { id } = req.user;
    const { comment } = req.body;
    const queryObj = {
      userId: id,
      tripRequestId,
      comment

    };
    CommonQueries.create(comments, queryObj);
    return comment;
  }

  /**
* users or managers can view comment thread
* @static
* @description GET /api/users/:tripRequestId/comments
* @param {object} req request object
* @memberof CommentService
* @returns {object} data
*/
  static async getComments(req) {
    const { tripRequestId } = req.params;
    const queryObj = {
      attributes: ['comment', 'updatedAt'],
      include: [{
        model: users,
        attributes: ['firstName', 'lastName']
      }],
      where: {
        tripRequestId,
      }
    };

    const tripComments = await CommonQueries.findAll(comments, queryObj);

    return tripComments[0];
  }


  /**
* users or managers can view comment thread
* @static
* @description GET /api/users/:tripRequestId/comments
* @param {object} req request object
* @memberof CommentService
* @returns {object} data
*/
  static async getSpecificComments(req) {
    const { commentId } = req.params;
    const queryObj = {
      where: {
        commentId,
      }
    };

    const specificComment = await CommonQueries.findOne(comments, queryObj);

    return specificComment;
  }


  /**
* users can delete a comment they made
* @static
* @description DELETE/api/trips/:commentId
* @param {object} req request object
* @param {object} res response object
* @memberof CommentService
* @returns {object} data
*/
  static async deleteComment(req) {
    const { commentId } = req.params;
    const queryObject = {
      where: {
        id: commentId,
      }
    };
    const deletingComment = await CommonQueries.destroy(comments, queryObject);
    return deletingComment;
  }
}
export default CommentService;
