import Response from '../helpers/Response';
import SearchService from '../services/SearchService';


const { searchByPreference } = SearchService;
/**
 * @exports
 * @class SearchController
 */
class SearchController {
  /**
   * User can search trips by preference
   * @static
   * @param {object} req  request object
   * @param {object} res response object
   * @memberof SearchController
   * @returns {object} data
   */
  static async searchedByPreference(req, res) {
    const searchedTrips = await searchByPreference(req);
    const searchedTripsMap = searchedTrips.filter(request => request.tripRequest !== null);
    if (searchedTripsMap.length === 0) {
      return Response.errorMessage(req, res, 'Oooops! No trips matching this search query parameter were found!', 404);
    }
    return Response.successMessage(req, res, 'Successfully retrieved trip requests by that search query parameter', searchedTripsMap, 200);
  }
}
export default SearchController;
