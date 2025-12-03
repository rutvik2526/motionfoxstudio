
import React from 'react';
import { Users, Activity, Trophy } from 'lucide-react';
import { GlobalStats, LoadingState } from '../types';

interface LiveWidgetProps {
  stats: GlobalStats | null;
  status: LoadingState;
}

const LiveWidget: React.FC<LiveWidgetProps> = ({ stats, status }) => {
  if (status === LoadingState.LOADING && !stats) {
    return (
      <div className="bg-white/80 backdrop-blur-md border border-stone-200 rounded-lg p-4 animate-pulse shadow-sm">
        <div className="h-4 bg-stone-200 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-stone-200 rounded w-3/4"></div>
      </div>
    );
  }

  const liveCount = stats?.totalLivePlayers.toLocaleString() || '---';
  const visitsCount = stats?.totalVisits ? (stats.totalVisits / 1000000).toFixed(1) + 'M+' : '150M+';
  
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-stone-200 rounded-xl p-6 shadow-xl relative overflow-hidden group grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <Activity size={96} className="text-fox-600" />
      </div>
      
      {/* Live Players */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
          </div>
          <h3 className="text-stone-500 text-sm font-bold uppercase tracking-wider">Live Players</h3>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">{liveCount}</span>
          <span className="text-stone-500 text-sm font-medium">currently playing</span>
        </div>
      </div>

      {/* Total Visits */}
      <div className="border-t md:border-t-0 md:border-l border-stone-200 pt-4 md:pt-0 md:pl-6">
        <div className="flex items-center gap-2 mb-2">
           <Trophy size={16} className="text-fox-500" />
           <h3 className="text-stone-500 text-sm font-bold uppercase tracking-wider">Total Visits</h3>
        </div>
        <div className="text-3xl font-bold text-stone-900 tracking-tight">
          {visitsCount}
        </div>
        <div className="mt-2 text-xs text-stone-400 flex items-center gap-1">
          <Users size={12} />
          <span>Updates every 30s</span>
        </div>
      </div>
    </div>
  );
};

export default LiveWidget;