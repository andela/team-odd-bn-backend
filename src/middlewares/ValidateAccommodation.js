import Response from '../helpers/Response';
/**
 * @export
 * @class ValidateAccommodation
 */
export default class ValidateAccommodation {
  /**
   * check if checkInDate is the same as the checkOutDate
   * @static
   * @param {object} req response Object
   * @param {object} res request Object
   * @param {object} next next
   * @memberof ValidateTrip
   * @returns {object} data
   */
  static async checkIfCheckInDateIsAsCheckOutDate(req, res, next) {
    const { checkInDate, checkOutDate } = req.body;

    const checkInDateCheckOutDate = {};
    const checkInDates = new Date(checkInDate);
    const checkOutDates = new Date(checkOutDate);
    if (JSON.stringify(checkInDates) > JSON.stringify(checkOutDates)) {
      checkInDateCheckOutDate.message = 'CheckOutDate should be greater than CheckInDate';
      checkInDateCheckOutDate.date = true;
    } if (JSON.stringify(checkInDates) === JSON.stringify(checkOutDates)) {
      checkInDateCheckOutDate.message = 'CheckInDate should not be same as CheckOutDate';
      checkInDateCheckOutDate.CheckInDate = true;
    }
    if (checkInDateCheckOutDate.date || checkInDateCheckOutDate.CheckInDate) {
      return Response.errorMessage(req, res, checkInDateCheckOutDate.message, 400);
    }
    return next();
  }
}
