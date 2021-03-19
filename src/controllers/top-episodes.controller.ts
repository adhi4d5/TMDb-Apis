import { Request, Response } from 'express';
import TopEpisodesService  from '../services/top-episodes.service';

class TopEpisodesController {
  async getTopEpisodes(req: Request, resp: Response) {
   const tvId = req.params.id;
   try {
   const topEpisodes =  await TopEpisodesService.getTopEpisodes(tvId);
   resp.status(200).send(topEpisodes);
   } catch (error) {
     resp.status(400).send( error );
  }
 }
}
export default new TopEpisodesController();