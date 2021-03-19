import * as mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  seriesName: String,
  accessCount: Number
}, {timestamps: false});

const AnalyticsRepository = mongoose.model('analytics', AnalyticsSchema);
export default AnalyticsRepository;
