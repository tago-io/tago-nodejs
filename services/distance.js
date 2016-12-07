'use strict';
const request         = require('../comum/service_request.js');
const default_headers = require('../comum/default_headers.js');
/*
Google Distance API docs: https://developers.google.com/maps/documentation/distance-matrix/intro
*/

class Distance {
    constructor(key) {
        this.key = key;
        this.default_options = {
            // 'json':    true,
            'headers': default_headers(this)
        };
    }

    /**
     * Get a distance
     * @param  {STRING} to
     * @param  {STRING} message Message to be send
     * @return {Promise}
     */
    measure(origins, destinations, language, mode) {
        return new Promise((resolve, reject) => {
            if (!origins) {
                reject('Invalid origin');
            }
            if (!destinations) {
                reject('Invalid destinations');
            }

            let handle_locations = (geolocation) => {
                if (typeof geolocation === 'string') {
                    let geoplited = geolocation.split(',');

                    if (geoplited.length < 2) {
                        return null;
                    } else {
                        return geolocation;
                    }
                } else if (geolocation && geolocation.coordinates) {
                    geolocation = geolocation.coordinates;
                    return `${geolocation[1]},${geolocation[0]}`;
                } else {
                    return null;
                }
            };

            let make_string_togoogle = (array_obj) => {
                if (!Array.isArray(array_obj)) {
                    array_obj = [array_obj];
                }

                let array_obj_string;
                array_obj.forEach((x) => {
                    let handled_loc = handle_locations(x);
                    if (handled_loc) {
                        array_obj_string = (array_obj_string ? `${array_obj_string}|${handled_loc}` : handled_loc);
                    }
                });

                return array_obj_string || '';
            };

            let origins_string      = make_string_togoogle(origins);
            let destinations_string = make_string_togoogle(destinations);

            let url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
            let method = 'GET';
            let params = {
                origins:      origins_string,
                destinations: destinations_string,
                mode:         mode || 'car',
                language:     language || 'en-US',
                key:          this.key,
            };
            let options = Object.assign({}, this.default_options, {url, method, params});

            return request(options);
        });
    }
}

module.exports = Distance;