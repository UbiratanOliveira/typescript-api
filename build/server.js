"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
app_1.default.app.listen(3000, function () { return console.log('Server is running on port 3000.'); });
process.once('SIGUSR2', function () { return app_1.default.closeDatabaseConnection('Nodemon was restarted.', function () { return process.kill(process.pid, 'SIGUSR2'); }); });
process.on('SIGINT', function () { return app_1.default.closeDatabaseConnection('Execution has stopped.', function () { return process.exit(0); }); });
debugger;
