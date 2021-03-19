import fetch from 'node-fetch';
import { ResponseModel, ResponseEpisode } from '../models/response.model';
import { SeriesModel } from '../models/series.model';
import { SeasonModel } from '../models/season.model';
import  AnalyticsService  from './analytics.service';
import * as _ from 'underscore';
import * as cacheManager from 'cache-manager';
import * as  https  from 'https';

const  memoryCache = cacheManager.caching({store: 'memory', max: 100, ttl: 1000});
const CACHE_TIME = 6000;
const agent = new https.Agent({ rejectUnauthorized: false });

class TopEpisodesService {
  apiBaseUrl = 'https://api.themoviedb.org/3/tv';
  apiKey = 'f2516cac67fc39e5b51e745f5bf2f851';

  private  checkStatus(res) {
    if (res.ok) {
      return res;
    } else if (res.status === 404) {
      throw ({code: res.status, msg: 'Required resource not found'});
    } else if (res.status === 401) {
      throw ({code: res.status, msg: 'API KEY NOT SUPPLIED'});
    } else {
      throw ({code: res.status, msg: 'Something went wrong!'});
    }
  }

  public async getSeasons(seriesId: number, seasonCount: number): Promise<Array<SeasonModel>> {
    const all: Array<Promise<SeasonModel>> = [];
    for (let i = 1; i <= seasonCount; i++) {
      all.push(this.getSeason(seriesId, i));
    }
    return Promise.all(all).catch(err => {
      throw new Error('Something went wrong!');
    });
  }

  public getTopResults(data, count) {
    const sortedByVotes = _.sortBy(data, function(o) { return o.votes; });
    return sortedByVotes.reverse().slice(0, count);
  }

  private extractEpisodesWithVoteCounts(seasons) {
    let votes = [];
    const episodes = seasons.reduce((acc, item) => {
      votes = votes.concat(item.episodes.map(ep => {
        acc[item.season_number + '-' + ep.episode_number] = ep;
        return { season: item.season_number, ep: ep.episode_number, votes: ep.vote_average };
      }));
      return acc;
    }, {});

    return { episodes, votes };
  }

  private toEpisodesListModel(topResults, episodesObj): ResponseModel {
    const episodes = topResults.reduce((acc: ResponseEpisode[], result) => {
      const key = result.season + '-' + result.ep;
      const { name: episodeName, vote_average: averageVotes } = episodesObj[key];
      return [...acc, { episodeName, averageVotes }];
    }, []);

    return { episodes };
  }

  public async getTvSeries(id: number): Promise<SeriesModel> {
    const cachedData: any = await memoryCache.get('TV_SERIES_' + id);
    if (cachedData) {
      return Promise.resolve(JSON.parse(cachedData));
    }
    const url = this.apiBaseUrl + `/${id}?api_key=${process.env.MOVIEDB_KEY || this.apiKey}&language=en-us`;
    return fetch(url, agent)
    .then(this.checkStatus)
    .then(res => res.json())
    .then(data => {
        memoryCache.set('TV_SERIES_' + id, JSON.stringify(data), { ttl: CACHE_TIME });
        return data;
      }).catch((err) => {
        throw (err);
      });
  }

  public async getSeason(seriesId: number, seasonNo: number): Promise<SeasonModel> {
    const cachedData: any = await memoryCache.get('TV_SERIES_' + seriesId + '_SEASON_' + seasonNo);
    if (cachedData) {
      return Promise.resolve(JSON.parse(cachedData));
    }

    const url = this.apiBaseUrl + `/${seriesId}/season/${seasonNo}?api_key=${process.env.MOVIEDB_KEY || this.apiKey}&language=en-US`;
    return fetch(url, agent)
      .then(this.checkStatus)
      .then(res => res.json())
      .then(data => {
        memoryCache.set('TV_SERIES_' + seriesId + '_SEASON_' + seasonNo, JSON.stringify(data), { ttl: CACHE_TIME });
        return data;
      }).catch((err) => {
        throw (err);
      });
  }

  public async getTopEpisodes(id: number): Promise<ResponseModel> {
    const series: SeriesModel = await this.getTvSeries(id);
    const seasonsCount = series.number_of_seasons;
    const seasons: SeasonModel[] = await this.getSeasons(id, seasonsCount);
    const { episodes, votes } = await this.extractEpisodesWithVoteCounts(seasons);
    const topResults = this.getTopResults(votes, 20);
    AnalyticsService.incrementAccessCounter(series);
    return this.toEpisodesListModel(topResults, episodes);
  }

}

export default new TopEpisodesService();