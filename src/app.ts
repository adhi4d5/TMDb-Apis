import * as express from 'express';
import * as compression from 'compression';  // compresses requests
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import * as expressValidator from 'express-validator';
import { TmdbRouter, AnalyticsRouter } from './routes';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: '.env' });

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/moviesDb';
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, {useMongoClient: true}).then(() => {
  console.log('mongodb connected successfully');
 }).catch(err => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  // process.exit();
});
// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

app.use('/topEpisodes', TmdbRouter);
app.use('/analytics', AnalyticsRouter);

app.use((req: express.Request, resp: express.Response) => {
  resp.status(404).send({
    msg: 'Not Found!'
  });
});

module.exports = app;