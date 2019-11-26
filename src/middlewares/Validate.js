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
      check('password', 'minimum password length is 6').isLength({ min: 6 }),
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
      check('password', 'minimum password length is 6').isLength({ min: 6 }),
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
  static oneWayTripRules() {
    return [
      check('originId', 'originId should be an integer').isNumeric(),
      check('destinationId', 'destinationId should be an integer').isNumeric(),
      check('reason', 'Reason should be a minimum of 2 letters').isString().isLength({ min: 2 }),
      check('startDate', 'Start date should be a valid date after today(YY-MM-DD) ').isAfter().isISO8601(),
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
        check('gender').isIn(['male', 'female']),
      ], 'Gender should be either male or female'),
      check('birthDate', 'Invalid Date of Birth(format: YYYY-MM-DD && Make sure you are above 16)').isBefore(minAge),
      check('address', 'Address should be specified').isAlphanumeric(),
      check('imageURL', 'PRofile image URL should be valid'),
      check('department', 'department should be valid').isAlpha(),
      check('managerId', 'PLease provide your line manager').isInt(),
      check('bio', 'Please your bio is needed to complete your profile(at least 15 characters)').isLength({ min: 15 })
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
}
export default Validate;
