import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Quest } from '../types';

interface QuestFormProps {
  onSubmit: (quest: Omit<Quest, 'id' | 'completed' | 'createdAt' | 'completedAt'>) => void;
  onClose: () => void;
  categories: string[];
}

export default function QuestForm({ onSubmit, onClose, categories }: QuestFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    xp: 50,
    gold: 10,
    category: categories[0],
    frequency: 'daily' as Quest['frequency'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold mb-6">Create New Quest</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Quest Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-700 rounded px-3 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-700 rounded px-3 py-2 text-white"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                XP Reward
              </label>
              <input
                type="number"
                value={formData.xp}
                onChange={(e) => setFormData({ ...formData, xp: parseInt(e.target.value) })}
                className="w-full bg-gray-700 rounded px-3 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Gold Reward
              </label>
              <input
                type="number"
                value={formData.gold}
                onChange={(e) => setFormData({ ...formData, gold: parseInt(e.target.value) })}
                className="w-full bg-gray-700 rounded px-3 py-2 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value as Quest['frequency'] })}
              className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="challenge">Challenge</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 mt-6"
          >
            Create Quest
          </button>
        </form>
      </div>
    </div>
  );
}