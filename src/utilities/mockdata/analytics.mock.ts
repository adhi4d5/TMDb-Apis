const AnalyticsEntityMockReq = [
    { seriesName: 'test', accessCount: 12 },
    { seriesName: 'test12', accessCount: 32 },
    { seriesName: 'test43', accessCount: 42 }];

const AnalyticsEntityMockRes = [
    { _id: '78sd999sd9s', seriesName: 'test', accessCount: 12 },
    { _id: '78sd999sd9s2', seriesName: 'test12', accessCount: 32 },
    { _id: '78sd999sd9s3', seriesName: 'test43', accessCount: 42 }
  ];

 module.exports = {
    AnalyticsEntityMockReq,
    AnalyticsEntityMockRes
};