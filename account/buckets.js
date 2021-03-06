const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class Buckets {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** List Buckets
     * @param  {Number} page
     * Page of list starting from 1
     * Default: 1
     * @param  {Array} fields
     * Array of field names
     * Default: ['id', 'name']
     * Example: ['id', 'name', 'visible']
     *
     * Values allowed:
     * id, name, description, visible, data_retention,
     * account, tags, created_at, updated_at.
     * @param  {JSON} filter
     * JSON of filter
     * Without default
     * Example: {name: 'Motor'}
     * Values allowed: same of fields parameter.
     *
     * TIP: On name you can use * (asterisk) as wildcard.
     * @param {Number} amount
     * Amount of items will return
     * Default is 20
     * @param {String} orderBy
     * Order by a field
     * Examples:
     *  'name,asc'
     *  'name,desc'
     *  'name' [default: asc]
     * @return {Promise}
     * Array of buckets in alphabetically order.
    */
  list(page = 1, fields = ['id', 'name'], filter = {}, amount = 20, orderBy = 'name,asc') {
    if (!arguments.length) return this._list(); // @deprecated
    const url    = `${config.api_url}/bucket`;
    const method = 'GET';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer,
      params: {
        page,
        filter,
        fields,
        amount,
        orderBy,
      } };
    return request(options);
  }

  /**
     * It return old api style
     * @deprecated
     */
  _list() {
    const parameters = [
      1,
      ['account', 'created_at', 'id', 'name', 'tags', 'visible'],
      {},
      1000,
      'name',
    ];
    return this.list.call(this, ...parameters);
  }

  /** Create a Bucket
    * @param  {object} data
    * @param  {string} data.name - Name of the bucket
    * @param  {string} data.description - description of the bucket
    * @param  {boolean} data.active - Set if bucket is active or not
    * @param  {object[]} tags - bucket tags for categorization
    * @param  {string} tags[].key - key of the tag
    * @param  {string} tags[].value - value of the tag
    * @return {Promise}
     */
  create(data) {
    data       = data || {};
    const url    = `${config.api_url}/bucket`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Edit the Bucket
    * @param  {String} bucket id
    * @param  {object} data
    * @param  {string} data.name - Name of the bucket
    * @param  {string} data.description - description of the bucket
    * @param  {boolean} data.active - Set if bucket is active or not
    * @param  {object[]} tags - bucket tags for categorization
    * @param  {string} tags[].key - key of the tag
    * @param  {string} tags[].value - value of the tag
    * @return {Promise}
     */
  edit(bkt_id, data) {
    data       = data || {};
    const url    = `${config.api_url}/bucket/${bkt_id}`;
    const method = 'PUT';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Delete the Bucket
    * @param  {String} bucket id
    * @return {Promise}
     */
  delete(bkt_id) {
    const url    = `${config.api_url}/bucket/${bkt_id}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** DeleteVariable the variables inside the bucket
    * @param  {String} bucket id
    * @param  {object} data
    * @param  {string} data.variable - Name of the variable
    * @param  {string} data.origin - Name of the origin
    * @return {Promise}
    */
  deleteVariable(bkt_id, data) {
    data = data || {};
    const url = `${config.api_url}/bucket/${bkt_id}/variable`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** listVariables the variables inside the bucket
    * @param  {String} bucket id
    * @param  {Boolean} showAmount return amount of each variable
    * @param  {Boolean} showDeleted return array of async deleted
    * @param  {Boolean} resolveOriginName
    * Change origins to array of object with id and name
    * @return {Promise}
    */
  listVariables(bkt_id, show_amount = false, show_deleted = false, resolveOriginName = false) {
    const url = `${config.api_url}/bucket/${bkt_id}/variable`;
    const method = 'GET';

    const options = { ...this.default_options,
      url,
      method,
      params: {
        amount: show_amount,
        deleted: show_deleted,
        resolveOriginName,
      } };
    return request(options);
  }

  /**
   * Get all device associated with bucket
   * @param {String} bkt_id Bucket id
   * @return {Promise} Array of Devices with ID and Name
   */
  getDevicesAssociated(bkt_id) {
    if (!bkt_id || bkt_id === '') {
      return Promise.reject('Bucket ID parameter is obrigatory.');
    }
    const url = `${config.api_url}/bucket/${bkt_id}/device`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** Get Amount of data on the Bucket
    * @param  {String} Bucket id
    * @return {Promise} With number of amount
    */
  amount(bkt_id) {
    if (!bkt_id || bkt_id === '') {
      return Promise.reject('Bucket ID parameter is obrigatory.');
    }
    const url = `${config.api_url}/bucket/${bkt_id}/data_amount`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** Get Info of the Bucket
    * @param  {String} bucket id
    * @return {Promise}
    */
  info(bkt_id) {
    if (!bkt_id || bkt_id === '') {
      // If ID is send with null, it will get List instead info.
      return Promise.reject('Bucket ID parameter is obrigatory.');
    }
    const url    = `${config.api_url}/bucket/${bkt_id}`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** Export Data from Bucket
    * @param  {String} output csv/json/xml
    * @param  {Object[]} buckets -
    * @param  {String} buckets[].id - bucket id to be filtred
    * @param  {String} buckets[].origin - variable origin to be filtred
    * @param  {Object[]} buckets[].variables - Array with variables name to be exported
    * @param  {Object} options -
    * @param  {String} options.start_date - start date to be filtred
    * @param  {String} options.end_date - end date to be filtred
    * @return {Promise}
     */
  exportData(output, buckets, options) {
    buckets = buckets || [];
    options = options || {};
    if (!output || output === '') {
      return Promise.reject('Output parameter is obrigatory.');
    } else if (!buckets || !buckets[0]) {
      return Promise.reject('Buckets parameter is obrigatory.');
    }

    const data = { buckets, ...options };

    const url    = `${config.api_url}/data/export?output=${output}`;
    const method = 'POST';

    const request_options = { ...this.default_options, url, method, data };
    return request(request_options);
  }
}

module.exports = Buckets;
