import { trips } from '../database/models';
import CommonQueries from './CommonQueries';
import commonSearchQueries from './commonSearchQueries';
/**
 * @exports
 * @class searchService
 */
class SearchService {
  /**
 * users can search for a trip by preference
 * @static
 * @description GET /api/search
 * @param {object} req request object
 * @memberof SearchService
 * @returns {object} data
 */
  static async searchByPreference(req) {
    const { query } = req;
    const searchingTrips = await CommonQueries.findAll(
      trips, commonSearchQueries(query, req.user.id)
    );
    return searchingTrips;
  }
}

export default SearchService;
