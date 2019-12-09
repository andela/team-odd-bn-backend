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

  /**
   * get number of specific rows
   * @static
   * @param {object} table table
   * @param {object} queryObject pass object
   * @memberof CommonQueries
   * @returns {object} either an error or data
   */
  static async count(table, queryObject) {
    const rows = await table.count(queryObject);

    return rows;
  }

  /**
   * delete row
   * @static
   * @param {object} table table
   * @param {object} queryObject pass object
   * @memberof CommonQueries
   * @returns {object} either an error or data
   */
  static async destroy(table, queryObject) {
    const row = await table.destroy(queryObject);

    return row;
  }
}

export default CommonQueries;
