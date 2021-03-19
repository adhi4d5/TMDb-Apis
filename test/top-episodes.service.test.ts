import fetch from 'node-fetch';
import TopEpisodesService from '../src/services/top-episodes.service';
const {seriesMock} = require('../src/utilities/mockdata/series.mock');
const {season1Mock} = require('../src/utilities/mockdata/seasons.mock');
const {topEpisodesMock} = require('../src/utilities/mockdata/topEpisodes.mock');
jest.mock('node-fetch');
describe('GET service tp-episodes ', async () => {
    it('should call external service to fetch the series data and from cache in next', async done => {
        const seriesResponse = {
            ok: true, json() {
                return Promise.resolve(seriesMock);
            },
        };
        fetch.mockReturnValue(Promise.resolve(seriesResponse));
        const response = await TopEpisodesService.getTvSeries(123);
        expect(response).toEqual(seriesMock);
        done();
    });
    it('should get topEpisodes', async done => {
        const tvSeriesSpy = jest.spyOn(TopEpisodesService, 'getTvSeries').mockReturnValue(Promise.resolve(seriesMock));
        const seasonSpy = jest.spyOn(TopEpisodesService, 'getSeasons').mockReturnValue(Promise.resolve([season1Mock]));
        const topEpisodes = await TopEpisodesService.getTopEpisodes(123);
        expect(tvSeriesSpy).toHaveBeenCalledWith(123);
        expect(seasonSpy.mock.calls.length).toEqual(1);
        expect(seasonSpy.mock.calls).toEqual([
            [123, 2]
        ]);
        expect(topEpisodes.episodes).toEqual(topEpisodesMock);
        done();
    });
});