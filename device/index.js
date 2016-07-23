'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const Socket          = require('./../utils/').socket;

/** Class for the device and data */
class Device {
    /** Device
     * @param  {String} Device Token
     * @param  {Boolean} Show Details
     * @return {Object} Device Object
     */
    constructor(token, details) {
        this.token   = token;
        this.default_options = {
            'json': true,
            'headers': default_headers(this)
        };

        if (details) {
            this.default_options.qs = {'details': true};
        }
    }

    /** Insert
     * @param  {Object|Array} data
     * @return {Promise}
     */
    insert(data) {
        data       = data || {};
        let url    = `${config.api_url}/data`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Find
     * @class
     * @param  {JSON} query object
     * @return {Promise}
     */
    find(query_obj) {
        query_obj  = query_obj || {};
        let url    = `${config.api_url}/data`;
        let method = 'GET';
        let params = Object.assign({}, this.default_options.qs || {}, query_obj);

        let options = Object.assign({}, this.default_options, {url, method, params});

        return request(options);
    }

    /** remove
     * @param  {JSON} query object
     * @return {Promise}
     */
    remove(variable_or_id) {
        let url    = `${config.api_url}/data`;
        if (variable_or_id) {
            url += `/${variable_or_id}`;
        }
        
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});

        return request(options);
    }

     /** Get Parameters
     * @return {Promise}
     */
    get_params() {
        let url     = `${config.api_url}/device/params`;
        let method  = 'GET';
        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Mark Parameters as sent
     * @param  {String} Key
     * @return {Promise}
     */
    mark_param(key_name) {
        let url     = `${config.api_url}/device/params/${encodeURIComponent(key_name)}`;
        let method  = 'PUT';
        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

     /** Listen to device socket
     * @param  {function} callback to be executable
     * @return {function}
     */
    listening(callback) {
        this.socket = new Socket(this.token);
        this.socket.listen_device(callback);
        this.socket.register = (result) => {
            if (result.error) return console.log(result.error);
            console.log(result.message);
        };
        return Promise.resolve('Trying to listen the device');
    }

    /** Stop to Listen the device */
    stopListen() {
        if (this.socket) {
            this.socket.stop_device();
            return Promise.resolve('Not listening to the device anymore');
        }
        return Promise.reject('Use .listening before trying to stop listening');
    }
}

module.exports = Device;
