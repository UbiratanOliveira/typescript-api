"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var Database = require("./config/db");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.middleware();
        this.routes();
        this.database = new Database();
        this.databaseConnection();
    }
    App.prototype.databaseConnection = function () {
        this.database.createConnection();
    };
    App.prototype.closeDatabaseConnection = function (message, callback) {
        this.database.closeConnection(message, function () { return callback(); });
    };
    App.prototype.middleware = function () {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    };
    App.prototype.routes = function () {
        this.app.route('/').get(function (req, res) { return res.status(200).json({
            'message': 'Hello World!'
        }); });
        this.app.route('/test').get(function (req, res) { return res.status(200).json({
            'message': 'Route /test is working!'
        }); });
    };
    return App;
}());
exports.default = new App();
