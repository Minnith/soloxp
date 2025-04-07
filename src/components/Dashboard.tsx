import React from 'react';
import { Shield, Swords, Coins, Trophy, Plus } from 'lucide-react';
import QuestList from './QuestList';
import StatsPanel from './StatsPanel';
import { Quest, UserStats } from '../types';

interface DashboardProps {
  stats: UserStats;
  quests: Quest[];
  onQuestComplete: (quest: Quest) => void;
  onQuestUndo: (quest: Quest) => void;
  onQuestAdd: () => void;
  onStatsEdit: (stats: Partial<UserStats>) => void;
}

export default function Dashboard({ 
  stats, 
  quests, 
  onQuestComplete, 
  onQuestUndo,
  onQuestAdd, 
  onStatsEdit 
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Shield className="w-10 h-10 text-yellow-400" />
            <h1 className="text-3xl font-bold">Solo Leveling System</h1>
          </div>
          <button
            onClick={onQuestAdd}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Quest
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <QuestList 
              quests={quests} 
              onComplete={onQuestComplete}
              onUndo={onQuestUndo}
            />
          </div>
          <div>
            <StatsPanel stats={stats} onEdit={onStatsEdit} />
          </div>
        </div>
      </div>
    </div>
  );
}