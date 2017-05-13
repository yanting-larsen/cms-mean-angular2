const config = require('config');

const app = require('./app');
const initDb = require('./db');

initDb(db => {
    db.on('error', (err) => {
        console.log(err);
        process.exit(1);
    });

    db.on('connected', () => {
        console.log("Database connection is ready");
    });
});

const server = app.listen(config.server.port, () => {
    const port = server.address().port;
    console.log("App is running on port", port);
});
