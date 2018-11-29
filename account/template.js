'use strict';
const request = require('../comum/tago_request.js');
const config = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Template {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json': true,
      'headers': default_headers(this)
    };
  }

  /**
   * Generate a template URL
   * Example:
   * {
   *  dashboard: '5bf54a646f053411309e048b',
   *  name: 'My Dashboard',
   *  image_logo: 'https://...png',
   *  image_main: 'https://...png',
   *  setup: {} // Dashboard Setup Object
   * }
   * @param {JSON} templateObj Template JSON
   */
  generateTemplate(templateObj) {
    let url = `${config.api_url}/template`;
    let method = 'POST';

    let options = Object.assign({}, this.default_options, { url, method, data: templateObj });
    return request(options);
  }

  /**
   * Install template on account
   * @param {String} template_id Template ID
   */
  installTemplate(template_id) {
    let url = `${config.api_url}/template/${template_id}`;
    let method = 'POST';

    let options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }

  /**
   * Get template info anonymous
   * @param {String} template_id Template ID
   */
  static getTemplate(template_id) {
    let url = `${config.api_url}/template/${template_id}`;
    let method = 'GET';

    let options = Object.assign({}, { url, method });
    return request(options);
  }

  /**
   * Get template info
   * @param {String} template_id Template ID
   */
  getTemplate(template_id) {
    return Template.getTemplate(template_id);
  }
}

module.exports = Template;
