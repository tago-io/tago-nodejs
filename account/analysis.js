'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Analyzes {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** List Analysis
     * @return {Promise}
     */
    list() {
        let uri    = `${config.api_uri}/analyze`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Create a Analyze
    * @param  {JSON} data
    * @return {Promise}
     */
    create(data = {}) {
        let uri    = `${config.api_uri}/analyze`;
        let method = 'POST';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Edit the Analyze
    * @param  {String} analyze id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(query_id = '', data = {}) {
        let uri    = `${config.api_uri}/analyze/${query_id}`;
        let method = 'PUT';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Delete the Analyze
    * @param  {String} analyze id
    * @return {Promise}
     */
    delete(query_id = '') {
        let uri    = `${config.api_uri}/analyze/${query_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Get Info of the Analyze
    * @param  {String} analyze id
    * @return {Promise}
     */
    info(query_id = '') {
        let uri    = `${config.api_uri}/analyze/${query_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Force Analyze to Run
    * @param  {String} analyze id
    * @return {Promise}
     */
    run(query_id = '') {
        let uri    = `${config.api_uri}/analyze/${query_id}/run`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }
}

module.exports = Analyzes;
