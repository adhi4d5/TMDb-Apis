
import  AnalyticsRepository  from '../schemas/analytics.schema';
import { AnalyticsEntity } from '../models/analytics.models';

export class AnalyticsService {

   toAnalyticsResponse(data: AnalyticsEntity[]) {
    const series = data.map(item => {
      const { seriesName, accessCount } = item;
      return { seriesName, accessCount };
    });
    return { series };
  }

  async getPopularSeries(): Promise<any> {
    const response: any = await AnalyticsRepository.find().sort({ accessCount: -1 }).limit(5);
    return this.toAnalyticsResponse(response);
  }

  async incrementAccessCounter({ name }): Promise<void> {
    await AnalyticsRepository.findOneAndUpdate({ seriesName: name },
       { $inc: { accessCount: 1 } }, { upsert: true });
  }
}
export default new AnalyticsService();