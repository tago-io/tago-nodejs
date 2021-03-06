
const request          = require('../comum/tago_request.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class Explore {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** Add item of explore in your account
   * @param  {string} explore_id
   * @return {Promise}
   */
  addExplore(explore_id) {
    const url    = `${config.api_url}/explore/${explore_id}`;
    const method = 'POST';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** List explore items
  */
  list() {
    const url    = `${config.api_url}/explore`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }
}

module.exports = Explore;
