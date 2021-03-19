import { Request, Response } from 'express';
import  AnalyticsService  from '../services/analytics.service';

class AnalyticsController {
 async getPopularSeries(req: Request, resp: Response) {
    try {
        const PopularSeries =  await AnalyticsService.getPopularSeries();
        resp.status(200).send(PopularSeries);
        } catch (error) {
          resp.status(400).send( error );
       }
   }
}

export default new AnalyticsController();