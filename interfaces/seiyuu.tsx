export type CharacterRole = "MAIN" | "SUPPORTING" | "BACKGROUND";
export type RankingType = "RATED" | "POPULAR";

export interface SeiyuuInfo {
  id: number;
  name: {
    full: string;
    native: string;
  };
  age: number;
  image: {
    large: string;
  };
  characterMedia: {
    edges: AnimeCharEdge[];
  };
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
