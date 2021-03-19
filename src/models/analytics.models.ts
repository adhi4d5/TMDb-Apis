import { ObjectID } from 'bson';

class SeriesCounter {
    seriesName: string;
    count: number;
  }

export class AnalyticsResponseModel {
    series: SeriesCounter[];
  }

export class AnalyticsEntity {
    _id: ObjectID;
    seriesName: string;
    accessCount: number;
  }