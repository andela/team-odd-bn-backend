/**
 * @export
 * @class CommonQueries
 */
class CommonQueries {
  /**
     *
     * @static
     * @param {object} table table
     * @param {object} queryObject pass object
     * @memberof CommonQueries
     * @returns {object} either an error or data
     */
  static async findOne(table, queryObject) {
    const oneRow = await table.findOne(queryObject);
    return oneRow;
  }

  /**
   *
   * @static
   * @param {object} table table
   * @param {object} queryObject pass object
   * @memberof CommonQueries
   * @returns {object} either an error or data
   */
  static async create(table, queryObject) {
    const oneRow = await table.create(queryObject);
    return oneRow;
  }

  /**
     * Find all
     * @static
     * @param {object} table table
     * @param {object} queryObject pass object
     * @memberof CommonQueries
     * @returns {object} either an error or data
     */
  static async findAll(table, queryObject) {
    const allRows = await table.findAll(queryObject);
    return allRows;
  }

  /**
     * Update table
     * @static
     * @param {object} table table
     * @param {object} queryObject pass object
     * @memberof CommonQueries
     * @returns {object} either an error or data
     */
  static async update(table, queryObject) {
    const rows = await table.update(...queryObject);

    return rows;
  }
}

export default CommonQueries;
