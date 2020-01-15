import Response from '../helpers/Response';
import CitiesService from '../services/CitiesServices';


const { getCities } = CitiesService;
/**
 * @exports
 * @class CitiesController
 */
class CitiesController {
  /**
   * Get all cities
   * @static
   * @param {object} req  request object
   * @param {object} res response object
   * @memberof CitiesController
   * @returns {object} data
   */
  static async getAllCities(req, res) {
    const cities = await getCities();
    return Response.successMessage(req, res, 'Successfully retrieved all cities', cities, 200);
  }
}
export default CitiesController;
