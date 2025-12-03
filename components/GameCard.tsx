
import React from 'react';
import { Play, Eye, ThumbsUp } from 'lucide-react';
import { Game, PlayerStats } from '../types';

interface GameCardProps {
  game: Game;
  stats?: PlayerStats;
}

const GameCard: React.FC<GameCardProps> = ({ game, stats }) => {
  
  const formatNumber = (num: number) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-fox-500/10 border border-stone-200 hover:border-fox-300 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden bg-stone-100">
        <img 
          src={game.thumbnailUrl || `https://picsum.photos/seed/${game.id}/800/600`} 
          alt={game.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            // Fallback: If big thumbnail fails, try the icon, else a placeholder
            if (game.iconUrl && target.src !== game.iconUrl) {
                target.src = game.iconUrl;
            } else {
                target.src = 'https://placehold.co/800x600/e7e5e4/78716c?text=No+Image';
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Live Count Badge */}
        {stats && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-stone-900 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-stone-200 shadow-sm z-10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {stats.liveCount.toLocaleString()} Playing
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow relative">
        <div className="flex items-start gap-3 mb-3">
          {/* Game Icon / Logo */}
          {game.iconUrl && (
            <img 
              src={game.iconUrl} 
              alt={`${game.title} Logo`} 
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-lg border border-stone-200 shadow-sm flex-shrink-0 bg-stone-100 object-cover"
              onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div className="flex-grow min-w-0">
            <h3 className="text-xl font-bold text-stone-900 group-hover:text-fox-600 transition-colors truncate leading-tight" title={game.title}>
              {game.title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {game.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 bg-stone-100 text-stone-600 font-medium text-[10px] uppercase tracking-wide rounded border border-stone-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-stone-600 text-sm mb-4 line-clamp-2 flex-grow">
          {game.description}
        </p>

        {/* Stats Row */}
        {stats && (
          <div className="flex items-center gap-4 mb-4 text-xs text-stone-500 font-medium border-t border-stone-100 pt-3">
             <div className="flex items-center gap-1" title="Total Visits">
               <Eye size={14} className="text-stone-400" />
               {formatNumber(stats.visits)}
             </div>
             <div className="flex items-center gap-1" title="Total Likes">
               <ThumbsUp size={14} className="text-stone-400" />
               {formatNumber(stats.likes)}
             </div>
          </div>
        )}

        <a 
          href={game.playUrl} 
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-fox-600 hover:bg-fox-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:shadow-fox-500/20 mt-auto"
        >
          <Play size={18} fill="currentColor" />
          Play Now
        </a>
      </div>
    </div>
  );
};

export default GameCard;