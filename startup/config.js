const config = require('config');

module.exports = function() {
    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.'); //best practice to throw an error object not string
    }
}