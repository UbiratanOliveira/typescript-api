"use strict";
var mongoose = require("mongoose");
var Database = /** @class */ (function () {
    function Database() {
        this.DB_URI = 'mongodb://localhost/ts-rest-api';
    }
    Database.prototype.createConnection = function () {
        mongoose.connect(this.DB_URI);
        this.logger(this.DB_URI);
    };
    Database.prototype.logger = function (uri) {
        this.DB_CONNECTION = mongoose.connection;
        this.DB_CONNECTION.on('connected', function () { return console.log("Mongoose is connected to the " + uri); });
        this.DB_CONNECTION.on('error', function (error) { return console.error.bind(console, "Connection error: " + error); });
        this.DB_CONNECTION.on('disconnected', function () { return console.log("Mongoose was disconnected from the database: " + uri); });
    };
    Database.prototype.closeConnection = function (message, callback) {
        this.DB_CONNECTION.close(function () {
            console.log("Mongoose was disconnected by: " + message);
            callback();
        });
    };
    return Database;
}());
module.exports = Database;
