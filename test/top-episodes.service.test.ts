import fetch from 'node-fetch';
import  TopEpisodesService  from '../src/services/top-episodes.service';
import * as cacheManager from 'cache-manager';
const  memoryCache = cacheManager.caching({store: 'memory', max: 100, ttl: 1000});

const { seriesMock } = require('../src/utilities/mockdata/series.mock');
const { season1Mock } = require('../src/utilities/mockdata/seasons.mock');
const { topEpisodesMock } = require('../src/utilities/mockdata/topEpisodes.mock');

jest.mock('node-fetch');

describe('GET service tp-episodes ', async() => {
    
    it('should call external service to fetch the series data and from cache in next', async done => {
    const seriesResponse = {
        ok: true, json() {
          return Promise.resolve(seriesMock);
        },
      };
      const response  = await TopEpisodesService.getTvSeries(123)
      expect(response).toEqual(seriesMock);
    });

    it('check method getTopResults check response ', async done => {
        const topEpisodes  = await TopEpisodesService.getTopResults(topEpisodesMock,10)
        expect(topEpisodes).not.toEqual(seriesMock);
        done();
     });

      it('should call external service to fetch the season data', async done => {
        const season1Response = {
          ok: true, json() {
            return Promise.resolve(season1Mock);
          },
        };
        fetch.mockReturnValue(Promise.resolve(season1Response));
        const cacheSpy = jest.spyOn(memoryCache.get('TV_SERIES_' ), 'catch').mockReturnValue(Promise.resolve(undefined));
        await TopEpisodesService.getSeason(123, 1);
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch).toHaveBeenCalledWith('https://api.themoviedb.org/3/tv/123/season/1?api_key=undefined&language=en-US');
        expect(cacheSpy).toHaveBeenCalledWith('TV_SERIES_123_SEASON_1');
        fetch.mockReset();
        cacheSpy.mockClear();
    
        const cacheSpy2 = jest.spyOn(memoryCache.get('TV_SERIES_' ), 'catch').mockReturnValue(Promise.resolve(JSON.stringify(season1Mock)));
        await TopEpisodesService.getSeason(123, 1);
        expect(cacheSpy2).toHaveBeenCalledWith('TV_SERIES_123_SEASON_1');
        expect(fetch.mock.calls.length).toEqual(0);
        done();
      });
    
      it('should get topEpisodes', async done => {
    
        const tvSeriesSpy = jest.spyOn(TopEpisodesService, 'getTvSeries').mockReturnValue(Promise.resolve(seriesMock));
        const seasonSpy = jest.spyOn(TopEpisodesService, 'getSeason').mockReturnValue(Promise.resolve(season1Mock));
    
        const topEpisodes = await TopEpisodesService.getTopEpisodes(123);
        expect(tvSeriesSpy).toHaveBeenCalledWith(123);
        expect(seasonSpy.mock.calls.length).toEqual(2);
        expect(seasonSpy.mock.calls).toEqual([
          [123, 1],
          [123, 2],
        ]);
        expect(topEpisodes.episodes).toEqual(topEpisodesMock);
        done();
      });
    
      it('should fail with 404 if series not found', async done => {
        fetch.mockReturnValue(Promise.resolve({ status: 404 }));
        await TopEpisodesService.getTvSeries(311).catch(error => {
          expect(error.status).toEqual(404);
          expect(fetch.mock.calls.length).toEqual(1);
          expect(fetch).toHaveBeenCalledWith('https://api.themoviedb.org/3/tv/311?api_key=undefined&language=en-us');
          done();
        });
      });
    
      it('should fail with 406 if unknown erro', async done => {
        fetch.mockReturnValue(Promise.resolve({ error: true }));
        await TopEpisodesService.getTvSeries(311).catch(error => {
          expect(error.status).toEqual(406);
          expect(fetch.mock.calls.length).toEqual(1);
          expect(fetch).toHaveBeenCalledWith('https://api.themoviedb.org/3/tv/311?api_key=undefined&language=en-us');
          done();
        });
      });

});
