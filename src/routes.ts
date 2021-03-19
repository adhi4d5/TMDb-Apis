import { Router } from 'express';
import TopEpisodesController from './controllers/top-episodes.controller';
import AnalyticsController from './controllers/analytics.controller';
const TmdbRouter = Router();
TmdbRouter.get('/:id', TopEpisodesController.getTopEpisodes);
const AnalyticsRouter = Router();
AnalyticsRouter.get('/popularSeries', AnalyticsController.getPopularSeries);
export { TmdbRouter, AnalyticsRouter };