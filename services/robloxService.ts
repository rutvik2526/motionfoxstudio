import { PlayerStats, GlobalStats } from '../types';

const CACHE_DURATION = 30000; // 30 seconds
let cachedStats: Record<string, PlayerStats> = {};
let lastFetchTime = 0;

// List of CORS proxies to try in order. If one fails, we try the next.
// This provides redundancy if a specific proxy is down or rate-limiting.
const PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`, // Keep as fallback
  (url: string) => `https://thingproxy.freeboard.io/fetch/${url}`
];

const ROBLOX_GAMES_API = "https://games.roblox.com/v1/games";

/**
 * Attempts to fetch a URL using multiple proxies in sequence.
 */
async function fetchWithFallback(targetUrl: string): Promise<any> {
  // Try direct fetch first (might work if no CORS issues)
  try {
    const directResponse = await fetch(targetUrl);
    if (directResponse.ok) {
      return await directResponse.json();
    }
  } catch (e) {
    // Direct fetch failed, try proxies
  }

  // Try each proxy in sequence
  for (const proxyGen of PROXIES) {
    const proxyUrl = proxyGen(targetUrl);
    try {
      const response = await fetch(proxyUrl, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      // Skip 403/401 errors quickly
      if (response.status === 403 || response.status === 401) {
        console.warn(`Proxy returned ${response.status}: ${proxyUrl}`);
        continue; // Try next proxy
      }
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await response.json();
        } else {
          // Some proxies return text, try to parse as JSON
          const text = await response.text();
          try {
            return JSON.parse(text);
          } catch {
            continue; // Try next proxy
          }
        }
      }
    } catch (e) {
      console.warn(`Proxy failed: ${proxyUrl}`, e);
      // Continue to next proxy
    }
  }
  throw new Error("All proxies failed");
}

export const fetchLiveStats = async (masterIds: number[]): Promise<Record<string, PlayerStats>> => {
  const now = Date.now();

  // Return cached data if valid
  if (now - lastFetchTime < CACHE_DURATION && Object.keys(cachedStats).length > 0) {
    return cachedStats;
  }

  const idsParam = masterIds.join(',');
  const targetUrl = `${ROBLOX_GAMES_API}?universeIds=${idsParam}`;

  try {
    const data = await fetchWithFallback(targetUrl);
    const newStats: Record<string, PlayerStats> = {};

    if (data && data.data) {
      data.data.forEach((game: any) => {
        newStats[game.id] = {
          gameId: game.id.toString(),
          liveCount: game.playing || 0,
          visits: game.visits || 0,
          likes: game.favoritedCount || 0,
          lastUpdated: now
        };
      });
      
      cachedStats = newStats;
      lastFetchTime = now;
      return newStats;
    }
  } catch (error) {
    console.warn("Failed to fetch real stats, falling back to mock/cache:", error);
    // If cache exists, return it even if expired rather than failing
    if (Object.keys(cachedStats).length > 0) return cachedStats;
  }

  // Fallback Mock data if API fails entirely
  const mockStats: Record<string, PlayerStats> = {};
  masterIds.forEach(id => {
    mockStats[id] = {
      gameId: id.toString(),
      liveCount: Math.floor(Math.random() * 500) + 100, // Random fallback
      visits: 1000000 + (id % 1000) * 1000,
      likes: 5000 + (id % 100),
      lastUpdated: now
    };
  });
  return mockStats;
};

export const calculateGlobalStats = (stats: Record<string, PlayerStats>): GlobalStats => {
  let totalLivePlayers = 0;
  let totalVisits = 0;

  Object.values(stats).forEach(s => {
    totalLivePlayers += s.liveCount;
    totalVisits += s.visits;
  });
  
  return {
    totalLivePlayers,
    activeGames: Object.keys(stats).length,
    totalVisits
  };
};

export interface GameMedia {
  masterId: number;
  iconUrl?: string;
  thumbnailUrl?: string;
}

export const fetchGameMedia = async (masterIds: number[]): Promise<Record<number, GameMedia>> => {
  const idsString = masterIds.join(',');
  const results: Record<number, GameMedia> = {};

  const thumbApiUrl = `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${idsString}&countPerUniverse=1&defaults=true&size=768x432&format=Png`;
  const iconApiUrl = `https://thumbnails.roblox.com/v1/games/icons?universeIds=${idsString}&size=512x512&format=Png&isCircular=false`;

  try {
    const [thumbRes, iconRes] = await Promise.all([
      fetchWithFallback(thumbApiUrl).catch(() => ({ data: [] })),
      fetchWithFallback(iconApiUrl).catch(() => ({ data: [] }))
    ]);

    // Process Thumbnails
    if (thumbRes.data) {
      thumbRes.data.forEach((item: any) => {
        if (item.thumbnails && item.thumbnails.length > 0 && item.thumbnails[0].imageUrl) {
          if (!results[item.universeId]) results[item.universeId] = { masterId: item.universeId };
          results[item.universeId].thumbnailUrl = item.thumbnails[0].imageUrl;
        }
      });
    }

    // Process Icons
    if (iconRes.data) {
      iconRes.data.forEach((item: any) => {
        if (item.imageUrl) {
           if (!results[item.targetId]) results[item.targetId] = { masterId: item.targetId };
           results[item.targetId].iconUrl = item.imageUrl;
        }
      });
    }

  } catch (error) {
    console.warn("Roblox Media Fetch Warning:", error);
  }

  return results;
};