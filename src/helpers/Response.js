/**
 * @exports
 * @class Response
*/
class Response {
  /**
   * @static
   * @param {request} req request object
   * @param {response} res response object
   * @param {message} message message
   * @param {data} data login data
   * @param {status} status status code
   * @returns {object} object
  */
  static successMessage(req, res, message, data, status) {
    res.status(status).json({
      message,
      data,
    });
  }

  /**
   * @static
   * @param {request} req request object
   * @param {response} res response object
   * @param {message} message message
   * @param {status} status status code
   * @returns {object} object
  */
  static errorMessage(req, res, message, status) {
    res.status(status).json({
      message,
    });
  }
}

export default Response;
