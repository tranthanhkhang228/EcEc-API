import './env';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import Router from './routes';
import dbconfig from './utils/database';
import * as config from './config';

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(cors(config.CORS_OPTIONS));
app.use(helmet());

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(Router);

createConnection(dbconfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  })
  .catch((err) => {
    console.log('Unable to connect to db', err);
    process.exit(1);
  });
