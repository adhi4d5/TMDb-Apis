import  AnalyticsService  from '../src/services/analytics.service';
const { AnalyticsEntityMockReq, AnalyticsEntityMockRes } = require('../src/utilities/mockdata/series.mock');
describe('AnalyticsService', () => {
     
    it('should be defined', () => {
        expect(AnalyticsService).toBeDefined();
      });

    it('toAnalyticsResponse tobe an array', async () => {
        const response: any = await AnalyticsService.toAnalyticsResponse(AnalyticsEntityMockReq);
        expect(expect.arrayContaining(response)).toEqual(expect.arrayContaining(AnalyticsEntityMockReq));
    });

});