
export interface Game {
  id: string;
  masterId: number; // Universe ID
  placeId: number; // Place ID (from the URL)
  title: string;
  description: string;
  thumbnailUrl: string;
  iconUrl: string;
  playUrl: string;
  tags: string[];
  isFeatured: boolean;
}

export interface PlayerStats {
  gameId: string;
  liveCount: number;
  visits: number;
  likes: number;
  lastUpdated: number;
}

export interface GlobalStats {
  totalLivePlayers: number;
  activeGames: number;
  totalVisits: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
