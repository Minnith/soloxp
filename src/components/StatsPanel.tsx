import React, { useState } from 'react';
import { UserStats } from '../types';
import { Shield, Swords, Coins } from 'lucide-react';

interface StatsPanelProps {
  stats: UserStats;
  onEdit: (stats: Partial<UserStats>) => void;
}

export default function StatsPanel({ stats, onEdit }: StatsPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Calculate progress values
  const xpProgress = (stats.xp / stats.nextLevelXp) * 100;
  const filledBars = Math.floor((stats.xp / stats.nextLevelXp) * 10);
  const emptyBars = 10 - filledBars;

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Character Stats</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Pixel-style Status Indicators */}
        <div className="flex gap-2">
          <div className="bg-[#1a1a1a] rounded px-2 py-1 flex items-center gap-1.5">
            <span className="text-green-500 font-mono text-sm">XP</span>
            <span className="text-white font-mono text-sm">{stats.xp}</span>
          </div>
          <div className="bg-[#1a1a1a] rounded px-2 py-1 flex items-center gap-1.5">
            <span className="text-yellow-500 font-mono text-sm">Gold</span>
            <span className="text-white font-mono text-sm">{stats.gold}</span>
          </div>
          <div className="bg-[#1a1a1a] rounded px-2 py-1 flex items-center gap-1.5">
            <span className="text-red-500 font-mono text-sm">HP</span>
            <span className="text-white font-mono text-sm">100</span>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300 font-mono">Level {stats.level}</span>
            </div>
            <span className="text-gray-400 text-sm font-mono">
              {stats.xp}/{stats.nextLevelXp}
            </span>
          </div>
          <div className="flex gap-0.5">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`h-2.5 flex-1 rounded-sm transition-colors duration-300 ${
                  i < filledBars ? 'bg-green-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-green-500 font-mono">{Math.round(xpProgress)}%</span>
            <span className="text-xs text-gray-500 font-mono">
              {stats.nextLevelXp - stats.xp} XP to next level
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {stats.categories.map((category) => (
              <div
                key={category.id}
                className="px-3 py-2 rounded font-mono"
                style={{ backgroundColor: category.color + '33' }}
              >
                <span className="text-sm">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Perks */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-3">Active Perks</h3>
          <div className="space-y-2">
            {stats.perks
              .filter((perk) => perk.unlocked)
              .map((perk) => (
                <div
                  key={perk.id}
                  className="flex items-center gap-2 text-sm text-gray-300 font-mono"
                >
                  <Swords className="w-4 h-4 text-green-400" />
                  {perk.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}