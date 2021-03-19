import { CrewModel, EpisodeModel } from './episode.model';
import { SeasonModel } from './season.model';

class Genre {
  id: number;
  name: string;
}

class Company {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export class SeriesModel {
  backdrop_path: string;
  created_by: CrewModel[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeModel;
  name: string;
  next_episode_to_air: EpisodeModel;
  networks: Company[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Company[];
  seasons: SeasonModel[];
  status: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

