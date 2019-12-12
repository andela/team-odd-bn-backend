import Response from '../helpers/Response';
import CommentService from '../services/CommentService';
import NotificationService from '../services/NotificationService';

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
    try {
      const comment = await CommentService.createComment(req);
      NotificationService.addCommentNotification(req);
      return Response.successMessage(req, res, 'Your comment was posted successfully', comment, 201);
    } catch (error) {
      return Response.errorMessage(req, res, 'Server error', 500);
    }
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
    try {
      const tripComments = await CommentService.getComments(req);
      return tripComments[0] ? Response.successMessage(req, res, 'All comments about this trip request have been retrieved successfuly!', tripComments, 200)
        : Response.errorMessage(req, res, 'No comments for this trip yet!', 200);
    } catch (error) {
      return Response.errorMessage(req, res, 'Server error', 500);
    }
  }

  /**
* owner of comment can delete comment
* @static
* @description DELETE /api/trips/delete/:commentId
* @param {object} req request object
* @param {object} res response object
* @memberof CommentController
* @returns {object} data
*/
  static async deleteComment(req, res) {
    try {
      const result = await CommentService.deleteComment(req);
      if (!result) {
        return Response.errorMessage(req, res, 'This comment does not exist!', 404);
      }
      return Response.successMessage(req, res, 'Your comment has been deleted successfully', '', 200);
    } catch (error) {
      return Response.errorMessage(req, res, error.message, 500);
    }
  }
}
export default CommentController;
