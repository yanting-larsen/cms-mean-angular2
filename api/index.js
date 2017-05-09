import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
    process.exit(1);
});

db.on('connected', () => {
    console.log("Database connection is ready");
});

// Mount all routes under /api
app.use('/api', routes);

// Handle errors
app.use((err, req, res, next) => {
    res.status(500).json({
        error: {
            message: err.message
        }
    });
});

const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log("App is running on port", port);
});

export default app;