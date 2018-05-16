import App from "./app";

App.app.listen(3000, () => console.log('Server is running on port 3000.'));

process.once('SIGUSR2', () => App.closeDatabaseConnection('Nodemon was restarted.', () => process.kill(process.pid, 'SIGUSR2')));
process.on('SIGINT', () => App.closeDatabaseConnection('Execution has stopped.', () => process.exit(0)));debugger