import { comments, users } from '../database/models';
import Customize from '../helpers/Customize';
import CommonQueries from '../services/CommonQueries';


/**
 * @exports
 * @class CommentController
 */
class CommentController {
  /**
 * users or managers can comment on a travel request
 * @static
 * @description POST /api/users/:tripRequestId/comment
 * @param {object} req request object
 * @param {object} res response object
 * @memberof CommentController
 * @returns {object} data
 */
  static async createComment(req, res) {
    const { tripRequestId } = req.params;
    const { id } = req.user;
    const { comment } = req.body;
    const queryObj = {
      userId: id,
      tripRequestId,
      comment

    };
    CommonQueries.create(comments, queryObj);
    return Customize.successMessage(req, res, 'Your comment was posted successfully', comment, 201);
  }

  /**
* users or managers can view comment thread
* @static
* @description POST /api/users/:tripRequestId/comments
* @param {object} req request object
* @param {object} res response object
* @memberof CommentController
* @returns {object} data
*/
  static async getComments(req, res) {
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

    return tripComments[0] ? Customize.successMessage(req, res, 'All comments about this trip request have been retrieved successfuly!', tripComments, 200)
      : Customize.errorMessage(req, res, 'No comments for this trip yet!', 200);
  }
}
export default CommentController;
