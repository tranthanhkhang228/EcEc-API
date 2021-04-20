import { Router } from 'express';
import accounts from './accounts';
import feedbacks from './feedback';
import registrations from './registration';
import stages from './stage';
import games from './game';
import journeys from './journey';

const routes = Router();

routes.use('/accounts', accounts);

routes.use('/feedbacks', feedbacks);

routes.use('/registrations', registrations);

routes.use('/stages', stages);

routes.use('/games', games);

routes.use('/journeys', journeys);

export default routes;
