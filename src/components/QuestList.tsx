import React, { useState } from 'react';
import { Quest } from '../types';
import { CheckCircle, Circle, Clock, Trophy, RotateCcw } from 'lucide-react';

interface QuestListProps {
  quests: Quest[];
  onComplete: (quest: Quest) => void;
  onUndo: (quest: Quest) => void;
}

export default function QuestList({ quests, onComplete, onUndo }: QuestListProps) {
  const [filter, setFilter] = useState<'all' | 'daily' | 'weekly' | 'challenge'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredQuests = quests.filter((quest) => {
    if (filter !== 'all' && quest.frequency !== filter) return false;
    if (categoryFilter !== 'all' && quest.category !== categoryFilter) return false;
    return true;
  });

  const categories = Array.from(new Set(quests.map((q) => q.category)));

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-indigo-600' : 'bg-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('daily')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'daily' ? 'bg-indigo-600' : 'bg-gray-700'
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setFilter('weekly')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'weekly' ? 'bg-indigo-600' : 'bg-gray-700'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setFilter('challenge')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'challenge' ? 'bg-indigo-600' : 'bg-gray-700'
          }`}
        >
          Challenges
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1 text-sm rounded-lg ${
            categoryFilter === 'all' ? 'bg-indigo-600' : 'bg-gray-700'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`px-3 py-1 text-sm rounded-lg ${
              categoryFilter === category ? 'bg-indigo-600' : 'bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredQuests.map((quest) => (
          <div
            key={quest.id}
            className={`p-4 rounded-lg ${
              quest.completed ? 'bg-gray-700/50' : 'bg-gray-700'
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => quest.completed ? onUndo(quest) : onComplete(quest)}
                className="mt-1"
              >
                {quest.completed ? (
                  <div className="group relative">
                    <CheckCircle className="w-6 h-6 text-green-400 group-hover:opacity-0 transition-opacity" />
                    <RotateCcw className="w-6 h-6 text-yellow-400 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </button>
              <div className="flex-1">
                <h3 className={`font-semibold ${quest.completed ? 'text-gray-400' : 'text-white'}`}>
                  {quest.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{quest.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-purple-400">+{quest.xp} XP</span>
                  {quest.gold > 0 && (
                    <span className="text-sm text-yellow-400">+{quest.gold} Gold</span>
                  )}
                  <span className="text-sm text-gray-500">{quest.category}</span>
                </div>
              </div>
              {quest.frequency === 'daily' && <Clock className="w-5 h-5 text-blue-400" />}
              {quest.frequency === 'weekly' && <Clock className="w-5 h-5 text-green-400" />}
              {quest.frequency === 'challenge' && <Trophy className="w-5 h-5 text-yellow-400" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}