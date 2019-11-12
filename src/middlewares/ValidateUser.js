import Joi from '@hapi/joi';
/**
 * @export
 * @class Validations
 */
class Validations {
  /**
    * User can be able to sign up
    * @static
    * @param {object} req request object
    * @param {object} res response object
    * @param {object} next next
    * @memberof Validations
    * @returns {object} data
    */
  static validateSignup(req, res, next) {
    try {
      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).required(),
        password: Joi.string().regex(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/).required()
      });
      const { error } = schema.validate(req.body);

      if (error) {
        throw new Error(error.details[0].message);
      }
      next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.message
      });
    }
  }
}
export default Validations;
