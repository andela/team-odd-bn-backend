import { check, oneOf } from 'express-validator';

/**
 * @export
 * @class Validate
 */
class Validate {
  /**
    * Validate input
    * @static
    * @returns {object} errors
    */
  static signupRules() {
    return [
      check('firstName', 'first name should be valid').isAlpha(),
      check('lastName', 'last name should be valid').isAlpha(),
      check('email', 'email should be valid').trim().isEmail(),
      check('password', 'A valid password should have a character, number, UPPERC CASE letter and a lower case letter and should be longer than 8').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
    ];
  }

  /**
    * Validate input
    * @static
    * @returns {object} errors
    */
  static signinRules() {
    return [
      check('email', 'email should be valid').trim().isEmail(),
      check('password', 'A valid password should have a character, number, UPPERC CASE letter and a lower case letter and should be longer than 8').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
    ];
  }

  /**
  * Validate input
  * @static
  * @returns {object} errors
  */
  static requestMultiTripRules() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const correctDate = new Date(year, month, day).toDateString();
    return [
      check('itinerary.*.startDate', 'Invalid Date(format: YYYY-MM-DD)').isAfter(correctDate),
      check('itinerary.*.returnDate', 'Invalid Date(format: YYYY-MM-DD)').isAfter(correctDate),
      check('itinerary.*.originId', 'originId should be an integer').isNumeric(),
      check('itinerary.*.destinationId', 'destinationId should be an integer').isNumeric(),
      check('itinerary.*.reason', 'reason should be a minimum of 2 letters').isString().isLength({ min: 2 }),
    ];
  }

  /**
  * Validate input
  * @static
  * @returns {object} errors
  */
  static locationRules() {
    return [
      check('name', 'name should be a minimum of 2 letters').isString().isLength({ min: 2 }),
    ];
  }

  /**
    * Validate input
    * @static
    * @returns {object} errors
  */
  static requestOnewayTripRules() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const correctDate = new Date(year, month, day).toDateString();
    return [
      check('originId', 'originId should be valid').isInt(),
      check('destinationId', 'destinationId should be valid').isInt(),
      check('reason', 'reason should be characters').isLength({ min: 2 }),
      check('startDate', 'Invalid Date(format: YYYY-MM-DD)').isAfter(correctDate),
    ];
  }

  /**
  * Validate input
  * @static
  * @returns {object} errors
  */
  static roleRequest() {
    return [
      check('email', 'email should be valid').trim().isEmail(),
      check('id', 'ID should be an integer').isInt(),
    ];
  }

  /**
    * Validate input
    * @static
    * @returns {object} errors
    */
  static twoWayTripRules() {
    return [
      check('originId', 'originId should be an integer').isNumeric(),
      check('destinationId', 'destinationId should be an integer').isNumeric(),
      check('reason', 'Reason should be a minimum of 2 letters').isString().isLength({ min: 2 }),
      check('startDate', 'Start date should be a valid date after today(YY-MM-DD) ').isAfter().isISO8601(),
      check('returnDate', 'returnDate must be valid date after today(YY-MM-DD) ').isAfter().isISO8601(),
    ];
  }

  /**
* Validate input
* @static
* @returns {object} errors
*/
  static profileUpdateRules() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const minAge = new Date(year - 16, month, day).toDateString();
    return [
      oneOf([
        check('gender').optional().isIn(['male', 'female']),
      ], 'Gender should be either male or female'),
      check('birthDate', 'Invalid Date of Birth(format: YYYY-MM-DD && Make sure you are above 16)').optional().isBefore(minAge),
      check('address', 'Address should be specified').optional().isAlphanumeric(),
      check('imageURL', 'PRofile image URL should be valid').optional(),
      check('department', 'department should be valid').optional().isAlpha(),
      check('managerId', 'PLease provide your line manager').optional().isInt(),
      check('bio', 'Please your bio is needed to complete your profile(at least 15 characters)').optional().isLength({ min: 15 })
    ];
  }

  /**
  * Validate input
  * @static
  * @returns {object} errors
  */
  static isIDInteger() {
    return [
      check('tripRequestId', 'ID should be an integer').isInt(),
    ];
  }

  /**
  * Validate input
  * @static
  * @returns {object} errors
  */
  static isUserId() {
    return [
      check('userId', 'ID should be an integer').isInt(),
    ];
  }

  /**
  * Validate input
  * @static
  * @returns {object} errors
  */
  static isTripIDInteger() {
    return [
      check('tripRequestId', 'ID should be an integer').isInt(),
    ];
  }

  /**
  * Validate input
  * @static
  * @returns {object} errors
  */
  static isAccommodationIDInteger() {
    return [
      check('accommodationId', 'ID should be an integer').isInt(),
    ];
  }

  /**
  * Validate input
  * @static
  * @returns {object} errors
  */
  static validateResendEmail() {
    return [
      check('email', 'email should be valid').trim().isEmail(),
    ];
  }

  /**
    * Validate accommodation params
    * @static
    * @returns {object} errors
    */
  static accommodationLikesDislikes() {
    return [
      oneOf([
        check('like').isIn(['true', 'false'])
      ], 'like param should be either true or false')
    ];
  }

  /**
  * Validate accommodation Id
  * @static
  * @returns {object} errors
  */
  static accommodationId() {
    return [
      check('accommodationId', 'Accommodation id should be an integer').isInt(),
    ];
  }

  /**
  * Validate input
* Validate user comment post
* @static
* @returns {object} errors
*/
  static commentPostRules() {
    return [
      check('comment', 'Comment should be of at least two characters').isLength({ min: 2 }),
      check('tripRequestId', 'Trip Request Id shopuld be of integer').isInt()
    ];
  }

  /**
    * Validate input
    * @static
    * @returns {object} errors
  */
  static editRequest() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const correctDate = new Date(year, month, day).toDateString();
    return [
      check('itinerary.*.startDate', 'Invalid Date(format: YYYY-MM-DD)').isAfter(correctDate).optional(),
      check('itinerary.*.returnDate', 'Invalid Date(format: YYYY-MM-DD)').isAfter(correctDate).optional(),
      check('itinerary.*.originId', 'originId should be an integer').isNumeric().optional(),
      check('itinerary.*.destinationId', 'destinationId should be an integer').isNumeric().optional(),
      check('itinerary.*.reason', 'reason should be a minimum of 2 letters').isString().isLength({ min: 2 }).optional(),

      check('originId', 'originId should be an integer').isNumeric().optional(),
      check('destinationId', 'destinationId should be an integer').isNumeric().optional(),
      check('reason', 'Reason should be a minimum of 2 letters').isString().isLength({ min: 2 }).optional(),
      check('startDate', 'Start date should be a valid date after today(YY-MM-DD) ').isAfter().isISO8601().optional(),
      check('returnDate', 'returnDate must be valid date after today(YY-MM-DD) ').isAfter().isISO8601().optional(),
    ];
  }

  /**
  * Validate input
* Validate user view comments
* @static
* @returns {object} errors
*/
  static getCommentsRules() {
    return [
      check('tripRequestId', 'Trip Request Id shopuld be of integer type').isInt()
    ];
  }

  /**
  * Validate input
* Validate comment id to be deleted
* @static
* @returns {object} errors
*/
  static deleteCommentRules() {
    return [
      check('commentId', 'Comment Id should be an integer').isInt()
    ];
  }

  /**
    * Validate reason for approval or rejection
    * @static
    * @returns {object} errors
    */
  static approveOrRejectRequest() {
    return [
      oneOf([
        check('status').isIn(['accept', 'reject']),
      ], 'status should be either reject or accept'),
      check('tripRequestId', 'trip request id should be an integer').isNumeric(),
      check('reason', 'Reason should be a minimum of 2 letters').isString().isLength({ min: 2 }),
    ];
  }

  /**
  * Validate trips stats inputs
  * @static
  * @returns {object} errors
  */
  static tripStatsRules() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const MaxDate = new Date(year + 20, month, day).toDateString();
    return [
      check('tripTypeId', 'trip type id should be an integer(1: One-way, 2: two-way, 3: Multi-city)').isInt(),
      check('user', 'user should be identified by id of integer type').isInt().optional(),
      check('from', 'To date should be valid(YYYY-MM-DD)').isBefore(MaxDate),
      check('to', 'End date should be valid(YYYY-MM-DD)').isBefore(MaxDate),
    ];
  }

  /**
    * Validate rating input
    * @static
    * @returns {object} errors
    */
  static ratingRules() {
    return [
      check('rating', 'rating should be a number ranging from 1 - 5').isNumeric({ min: 1, max: 5 }),
      check('review', 'Review should be a minimum of 2 letters').isString().isLength({ min: 2 }),
      check('accommodationId', 'accommodationId should be an integer').isNumeric(),
    ];
  }

  /**
    * Validate Booking accommodation inputs
    * @static
    * @returns {object} errors
  */
  static bookAccommodationRules() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const correctDate = new Date(year, month, day).toDateString();
    return [
      check('tripId', 'tripId should be an integer').isNumeric(),
      check('roomId', 'roomId should be valid').isInt(),
      check('checkInDate', 'Invalid Date(format: YYYY-MM-DD)').isAfter(correctDate),
      check('checkOutDate', 'Invalid Date(format: YYYY-MM-DD)').isAfter(correctDate),
    ];
  }

  /**
* Validate accomodation inputs
* @static
* @returns {object} errors
*/
  static checkAccommodationRules() {
    return [
      check('name', 'name should be a minimum of 2 letters').isString().isLength({ min: 2 }),
      check('address', 'address should be a minimum of 2 letters').isString().isLength({ min: 2 }),
      check('description', 'description should be a minimum of 2 letters').isString().isLength({ min: 10 }),
      check('rooms', 'Rooms must be provided').isLength({ min: 1 }),
      check('cityId', 'cityId should be an integer').isInt(),
      check('imageUrls', 'imageUrls must be provided').isLength({ min: 1 }),
      check('rooms.*.name', 'room name should be a minimum of 1 letters').isString().isLength({ min: 1 }),
      check('rooms.*.roomType', 'roomType should be a minimum of 2 letters').isString().isLength({ min: 2 })
    ];
  }

  /**
* Validate notification id
* @static
* @returns {object} errors
*/
  static validateNotificationIdRules() {
    return [
      check('notificationId', 'The notificationId should be an integer').isInt().optional(),
      check('notificationIds', 'The notificationIds should be an array').isArray().optional(),
      check('notificationIds.*', 'The notification IDs should be integer').isInt()
    ];
  }

  /**
  * Validate Social login info
  * @static
  * @returns {object} errors
  */
  static validateSocialLogin() {
    return [
      check('id', 'User Id is required and number').isInt(),
      check('email', 'Email is required and string').isString(),
      check('lastName', 'Last name is required and string').isString(),
      check('firstName', 'First name is required and string').isString()
    ];
  }
}
export default Validate;
