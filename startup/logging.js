const winston = require('winston'); //logger
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);
    });
    
    process.on('unhandledRejection', (ex) => {
        console.log('We got an unhandled promise rejection');
        winston.error(ex.message, ex);
        process.exit(1);
    });
    
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtExceptions.log'})
    )
    
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    //winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'error'}));
}