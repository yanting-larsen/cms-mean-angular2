const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

// Mount all routes under /api
app.use('/api', routes);

// Handle errors
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;
