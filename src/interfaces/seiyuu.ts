export type CharacterRole = 'MAIN' | 'SUPPORTING' | 'BACKGROUND';
export type RankingType = 'RATED' | 'POPULAR';

export const POPULARITY_DESC = 'POPULARITY_DESC';
export const SCORE_DESC = 'SCORE_DESC';
export const VOICE_ACTOR = 'Voice Actor'

export type RankSortType = 'POPULARITY_DESC' | 'SCORE_DESC';

export interface SeiyuuResult {
  Staff: SeiyuuInfo;
}

export interface SeiyuuSearchPageResult {
  Page: {
    staff: SeiyuuSearchInfo[];
  }
}

export interface SeiyuuInfo {
  id: number;
  name: {
    full: string;
    native: string;
  };
  age: number;
  primaryOccupations: string[];
  image: {
    large: string;
  };
  characterMedia: {
    edges: AnimeCharEdge[];
  };
}

export interface SeiyuuSearchInfo {
  id: number;
  name: {
    full: string;
    native: string;
  };
  primaryOccupations: string[];
}

export interface AnimeCharEdge {
  id: number;
  node: Anime;
  characters: Character[];
  characterRole: CharacterRole;
}

export interface Anime {
  id: string;
  title: {
    romaji: string;
    english: string;
  };
  averageScore: number;
  meanScore: number;
  popularity: number;
  rankings: AnimeRanking[];
  seasonYear: number;
}

export interface Character {
  id: number;
  name: {
    full: string;
  };
  image: {
    large: string;
  };
}

export interface AnimeRanking {
  rank: number;
  type: RankingType;
  allTime: boolean;
}
