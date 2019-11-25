import { check } from 'express-validator';

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
}
export default Validate;
