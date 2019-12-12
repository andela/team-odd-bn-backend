import Response from '../helpers/Response';
import UserService from '../services/UserService';

const { getAUser } = UserService;

/**
 * @export
 * @class SearchMiddleware
 */
class SearchMiddleware {
/**
   *  check if user exists
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   * @returns {Object} if an error exists, returns a bad request error response
   */
  static async checkIfUserExists(req, res, next) {
    const { userName } = req.params;
    const user = await getAUser(userName);
    if (!user.length) {
      return Response.errorMessage(req, res, 'Oops! user doesn\'t exist', 404);
    }
    return next();
  }
}

export default SearchMiddleware;
