'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const Widgets         = require('./dashboards.widgets.js');
const Realtime        = require('./../utils/').realtime;
const share           = require('./_share.js');

class Dashboards {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** List Dashboards
     * @return {Promise}
     */
    list() {
        let url    = `${config.api_url}/dashboard`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Create a Dashboard
    * @param  {JSON} data
    * @param  {string} data.name - Name of the dashboard
    * @return {Promise}
     */
    create(data) {
        data       = data || {};
        let url    = `${config.api_url}/dashboard`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Edit the Dashboard
    * @param  {String} dashboard id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(dashboard_id, data) {
        data       = data || {};
        let url    = `${config.api_url}/dashboard/${dashboard_id}`;
        let method = 'PUT';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Delete the Dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
    delete(dashboard_id) {
        let url    = `${config.api_url}/dashboard/${dashboard_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Get Info of the Dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
    info(dashboard_id) {
        if (!dashboard_id || dashboard_id == '') {
            //If ID is send with null, it will get List instead info.
            return new Promise((resolve,reject) => reject('Dashboard ID parameter is obrigatory.'));
        }
        let url    = `${config.api_url}/dashboard/${dashboard_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Get Info of the Dashboard
    * @param  {String} dashboard_id id of the dashboard
    * @param  {function} func function to run when realtime is triggered
    * @return {Promise}
     */
    listening(dashboard_id, func, realtime) {
        if (!dashboard_id || dashboard_id == '') {
            //If ID is send with null, it will get List instead info.
            return Promise.reject('Dashboard ID parameter is obrigatory.');
        }

        if (!this.realtime && !realtime) this.realtime = new Realtime(this.token);

        realtime = realtime || this.realtime;
        realtime.get_socket.on(`dashboard:${dashboard_id}`, func);

        return Promise.resolve('Listening to Dashboard ' +dashboard_id);
    }

    /** Stop to listen the dashboard by its ID
    * @param  {String} dashboard_id id of the dashboard
     */
    stopListening(id, realtime) {
        if (!this.realtime && !realtime) return;

        realtime = realtime || this.realtime;
        realtime.get_socket.off(`dashboard:${id}`);
    }


    /******************************************* */
    
    /** Get share list of the dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
    shareList(dashboard_id) {
        if (!dashboard_id || dashboard_id == '') {
            //If ID is send with null, it will get List instead info.
            return new Promise((resolve,reject) => reject('Dashboard ID parameter is obrigatory.'));
        }
        return share.list('dashboard', dashboard_id, this.default_options);
    }

    /** Share the dashboard with another person
    * @param  {String} dashboard id
    * @param  {JSON} data 
    * @param  {String} data{}.email - Email to receive invitation
    * @param  {String} data{}.message - Scope message for the email
    * @param  {boolean} data{}.copy_me - true to send a copy to yourself
    * @return {Promise}
     */
    shareSendInvite(dashboard_id, data) {
        data = data || {};
        if (!dashboard_id || dashboard_id == '') {
            return new Promise((resolve,reject) => reject('Dashboard ID parameter is obrigatory.'));
        } else if (!data.email) {
            return new Promise((resolve,reject) => reject('data.email parameter is obrigatory.'));
        }
        return share.invite('dashboard', dashboard_id, data, this.default_options);
    }

    /** Change permissions of the bucket
    * @param  {String} share id
    * @param  {JSON} data - 
    * @param  {String} data{}.email - Email to change permissions
    * @param  {String} data{}.permission - New Permission to be applied
    * @return {Promise}
     */
    shareEdit(share_id, data) {
        data = data || {};
        if (!share_id || share_id == '') {
            return new Promise((resolve,reject) => reject('Share ID parameter is obrigatory.'));
        } else if (!data.email) {
            return new Promise((resolve,reject) => reject('data.email parameter is obrigatory.'));
        }
        return share.edit('dashboard', share_id, data, this.default_options);
    }

    /** Remove share of the bucket
    * @param  {String} share id
    * @return {Promise}
     */
    shareDelete(share_id) {
        if (!share_id || share_id == '') {
            return new Promise((resolve,reject) => reject('Share ID parameter is obrigatory.'));
        } 
        return share.remove('dashboard', share_id, this.default_options);
    }
    /******************************************* */


    /** Generate a new public token for the dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
    genPublicToken(dashboard_id) {
        if (!dashboard_id || dashboard_id == '') {
            //If ID is send with null, it will get List instead info.
            return new Promise((resolve,reject) => reject('Dashboard ID parameter is obrigatory.'));
        }
        let url    = `${config.api_url}/dashboard/${dashboard_id}/share/public`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Clone the dashboard with special parameters
    * @param  {String} dashboard id
    * @param  {JSON} data - Name of the dashboard
    * @param  {String} data{}.email - Email to receive invitation
    * @param  {String} data{}.message - Scope message for the email
    * @param  {JSON} data{}.setup - special setup for clone 
    * @param  {boolean} data{}.copy_me - true to send a copy to yourself
    * @return {Promise}
     */
    shareClone(dashboard_id, data) {
        data = data || {};
        if (!dashboard_id || dashboard_id == '') {
            return new Promise((resolve,reject) => reject('Dashboard ID parameter is obrigatory.'));
        } else if (!data.email) {
            return new Promise((resolve,reject) => reject('data.email parameter is obrigatory.'));
        }

        let url    = `${config.api_url}/dashboard/${dashboard_id}/share/copy`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    // ----------- Sub-methods -----------
    get widgets() {
        return new Widgets(this.token);
    }
}

module.exports = Dashboards;
