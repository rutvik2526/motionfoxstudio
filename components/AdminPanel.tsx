
import React, { useState } from 'react';
import { Game } from '../types';
import { generateGameDescription } from '../services/geminiService';
import { Save, Wand2, X, Plus, Trash2, Edit } from 'lucide-react';

interface AdminPanelProps {
  games: Game[];
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ games, setGames, onLogout }) => {
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGame) return;

    if (games.find(g => g.id === editingGame.id)) {
      setGames(games.map(g => g.id === editingGame.id ? editingGame : g));
    } else {
      setGames([...games, editingGame]);
    }
    setEditingGame(null);
  };

  const handleGenerateDescription = async () => {
    if (!editingGame) return;
    setIsGenerating(true);
    const newDesc = await generateGameDescription(editingGame.title, editingGame.tags);
    setEditingGame({ ...editingGame, description: newDesc });
    setIsGenerating(false);
  };

  const handleAddNew = () => {
    setEditingGame({
      id: Date.now().toString(),
      masterId: 0,
      placeId: 0,
      title: 'New Game Project',
      description: '',
      thumbnailUrl: 'https://picsum.photos/800/600',
      iconUrl: '',
      playUrl: '#',
      tags: [],
      isFeatured: false
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this game?')) {
      setGames(games.filter(g => g.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-stone-900">Studio Admin Dashboard</h1>
          <button onClick={onLogout} className="text-stone-500 hover:text-fox-600 font-medium">Logout</button>
        </div>

        {/* Game List */}
        <div className="bg-white rounded-xl p-6 shadow-xl border border-stone-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-stone-900">Manage Portfolio</h2>
            <button 
              onClick={handleAddNew}
              className="bg-fox-600 hover:bg-fox-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
            >
              <Plus size={18} /> Add Game
            </button>
          </div>

          <div className="grid gap-4">
            {games.map(game => (
              <div key={game.id} className="bg-stone-50 border border-stone-200 p-4 rounded-lg flex items-center justify-between group hover:border-fox-300 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={game.thumbnailUrl} alt="" className="w-16 h-10 object-cover rounded shadow-sm" />
                  <div>
                    <h4 className="font-bold text-stone-900">{game.title}</h4>
                    <span className="text-xs text-stone-500">ID: {game.masterId} | Tags: {game.tags.join(', ')}</span>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setEditingGame(game)}
                    className="p-2 hover:bg-stone-200 rounded text-blue-600"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(game.id)}
                    className="p-2 hover:bg-stone-200 rounded text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {editingGame && (
          <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-2xl border border-stone-200">
              <button 
                onClick={() => setEditingGame(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold text-stone-900 mb-6">
                {games.find(g => g.id === editingGame.id) ? 'Edit Game' : 'New Game'}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-stone-600 text-sm font-medium mb-1">Title</label>
                    <input 
                      type="text" 
                      value={editingGame.title}
                      onChange={e => setEditingGame({...editingGame, title: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-stone-900 focus:border-fox-500 focus:ring-1 focus:ring-fox-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 text-sm font-medium mb-1">Master ID (Roblox API)</label>
                    <input 
                      type="number" 
                      value={editingGame.masterId}
                      onChange={e => setEditingGame({...editingGame, masterId: Number(e.target.value)})}
                      className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-stone-900 focus:border-fox-500 focus:ring-1 focus:ring-fox-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 text-sm font-medium mb-1">Place ID</label>
                    <input 
                      type="number" 
                      value={editingGame.placeId}
                      onChange={e => setEditingGame({...editingGame, placeId: Number(e.target.value)})}
                      className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-stone-900 focus:border-fox-500 focus:ring-1 focus:ring-fox-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 text-sm font-medium mb-1">Thumbnail URL</label>
                  <input 
                    type="text" 
                    value={editingGame.thumbnailUrl}
                    onChange={e => setEditingGame({...editingGame, thumbnailUrl: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-stone-900 focus:border-fox-500 focus:ring-1 focus:ring-fox-500 outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-stone-600 text-sm font-medium">Description</label>
                    <button
                      type="button"
                      onClick={handleGenerateDescription}
                      disabled={isGenerating}
                      className="text-xs text-fox-600 hover:text-fox-500 font-medium flex items-center gap-1"
                    >
                      <Wand2 size={12} />
                      {isGenerating ? 'Generating...' : 'Enhance with AI'}
                    </button>
                  </div>
                  <textarea 
                    value={editingGame.description}
                    onChange={e => setEditingGame({...editingGame, description: e.target.value})}
                    rows={4}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-stone-900 focus:border-fox-500 focus:ring-1 focus:ring-fox-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 text-sm font-medium mb-1">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    value={editingGame.tags.join(', ')}
                    onChange={e => setEditingGame({...editingGame, tags: e.target.value.split(',').map(t => t.trim())})}
                    className="w-full bg-stone-50 border border-stone-300 rounded p-2 text-stone-900 focus:border-fox-500 focus:ring-1 focus:ring-fox-500 outline-none"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setEditingGame(null)}
                    className="px-4 py-2 text-stone-500 hover:text-stone-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-fox-600 hover:bg-fox-500 text-white font-bold rounded-lg flex items-center gap-2 shadow-md"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;