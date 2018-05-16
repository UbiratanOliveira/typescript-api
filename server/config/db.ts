import * as mongoose from 'mongoose';

class Database {
    private DB_URI = 'mongodb://localhost/ts-rest-api';
    private DB_CONNECTION;

    constructor() {

    }

    createConnection() {
        mongoose.connect(this.DB_URI);
        this.logger(this.DB_URI);
    }

    logger(uri) {
        this.DB_CONNECTION = mongoose.connection;
        this.DB_CONNECTION.on('connected', () => console.log(`Mongoose is connected to the ${ uri }`));
        this.DB_CONNECTION.on('error', error => console.error.bind(console, `Connection error: ${ error }`));
        this.DB_CONNECTION.on('disconnected', () => console.log(`Mongoose was disconnected from the database: ${ uri }`));
    }

    closeConnection(message, callback) {
        this.DB_CONNECTION.close(() => {
            console.log(`Mongoose was disconnected by: ${ message }`);
            callback();
        })
    }
}

export = Database;