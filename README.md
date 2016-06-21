## Tago - Node.JS Lib

Official Node.js lib for Tago

## Code Status

[![wercker status](https://app.wercker.com/status/7eba1fa5503f7f5ad61a15a0a6e63234/m "wercker status")](https://app.wercker.com/project/bykey/7eba1fa5503f7f5ad61a15a0a6e63234)

## Documentation

#### Installation

NODE >= v6
```
$ npm install tago --save
```

NODE < v6
```
$ npm install tago@1.* --save
```

#### Usage
##### Insert Data
**.insert(JSON || Array);**
``` javascript
const Device = require('tago/device');
const mydevice = new Device('079a01a0-2ec4-11e6-a77d-991b8f63b767');

let data_to_insert = {
    'variable' : 'temperature',
    'location' : {'lat': 42.2974279, 'lng': -85.628292},
    'time'     : '2014-01-20 03:43:59',
    'unit'     : 'C',
    'value'    : 63
};

my_device.insert(data_to_insert)
    .then(api_response => {
        console.log('Data added');
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## License

Tago lib client for Node.js is released under the [Copyright License](https://github.com/tago-io/tago-nodejs/blob/master/LICENSE.md).