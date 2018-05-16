import express  = require('express');
import morgan  = require('morgan');
import bodyParser = require('body-parser');
import Database = require('./config/db');
import { url } from 'inspector';

class App {
    public app: express.Application;
    private morgan: morgan.Morgan;
    private bodyParser;
    private database: Database;

    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
        this.database = new Database();
        this.databaseConnection();
    }

    databaseConnection() {
        this.database.createConnection();
    }

    closeDatabaseConnection(message, callback) {
        this.database.closeConnection(message, () => callback());
    }

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    routes() {
        this.app.route('/').get((req, res) => res.status(200).json({
            'message': 'Hello World!'
        }));

        this.app.route('/test').get((req, res) => res.status(200).json({
            'message' : 'Route /test is working!'
        }));
    }

}

export default new App();