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
 * @memberof CommentController
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
* @description POST /api/users/:tripRequestId/comments
* @param {object} req request object
* @memberof CommentController
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
}
export default CommentService;
