import Response from '../helpers/Response';


/**
 * @exports
 * @class UserController
 */
class customValidator {
  /**
   * Validate coordinates
   * @static
   * @param {object} req  request object
   * @param {object} res response object
   * @param {object} next next
   * @memberof customValidator
   * @returns {object} data
   */
  static isCoordinates(req, res, next) {
    const { googleCoordinates } = req.body;

    const googleInt = googleCoordinates.split(',');
    let isNotCoordinate;
    googleInt.forEach((coordinate) => {
      if (parseFloat(coordinate) > 90 || parseFloat(coordinate) < -90) {
        isNotCoordinate = true;
      }
    });
    const googleCoordinatesPattern = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;
    if (!googleCoordinates.match(googleCoordinatesPattern)) {
      return Response.errorMessage(req, res, 'invalid google maps coordinates', 400);
    }
    if (isNotCoordinate) {
      return Response.errorMessage(req, res, 'invalid google maps coordinates', 400);
    }
    return next();
  }

  /**
* Check if the manager has provided user id
* @static
* @param {object} req request object
* @param {object} res response object
* @param {object} next next
* @memberof Conflict
* @returns {object} data
*/
  static isUserOrManager(req, res, next) {
    if (req.user.roleId === 6) { return req.query.user ? next() : Response.errorMessage(req, res, 'Please provide user id if you are a manager', 400); }
    next();
  }


  /**
   * Validate images
   * @static
   * @param {object} req  request object
   * @param {object} res response object
   * @param {object} next next
   * @memberof customValidator
   * @returns {object} data
   */
  static isImage(req, res, next) {
    const imageURL = req.body.imageURL ? [req.body.imageURL] : req.body.imageUrls;
    let isImage;
    imageURL.forEach((imageUrl) => {
      const extension = imageUrl.substring(
        imageUrl.lastIndexOf('.') + 1
      ).toLowerCase();
      const arrayOfExtension = ['gif', 'png', 'bmp', 'jpeg', 'jpg'];
      if (!arrayOfExtension.includes(extension)) {
        isImage = true;
      }
    });
    if (!isImage) {
      return next();
    }
    return Response.errorMessage(req, res, 'Invalid image url', 400);
  }
}
export default customValidator;
