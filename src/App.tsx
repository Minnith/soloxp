import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import QuestForm from './components/QuestForm';
import { Quest, UserStats } from './types';

const initialStats: UserStats = {
  level: 1,
  xp: 0,
  gold: 0,
  nextLevelXp: 100,
  categories: [
    { id: '1', name: 'Fitness', color: '#ef4444' },
    { id: '2', name: 'Learning', color: '#3b82f6' },
    { id: '3', name: 'Social', color: '#10b981' },
    { id: '4', name: 'Productivity', color: '#f59e0b' },
  ],
  perks: [
    {
      id: '1',
      name: 'Early Bird',
      description: 'Wake up early for 7 days straight',
      level: 1,
      unlocked: false,
    },
    {
      id: '2',
      name: 'Bookworm',
      description: 'Read for 30 minutes daily',
      level: 2,
      unlocked: false,
    },
  ],
};

const initialQuests: Quest[] = [
  {
    id: '1',
    name: 'Morning Workout',
    description: 'Complete a 30-minute workout session',
    xp: 50,
    gold: 10,
    category: 'Fitness',
    frequency: 'daily',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Study Session',
    description: 'Study a new programming concept for 1 hour',
    xp: 75,
    gold: 15,
    category: 'Learning',
    frequency: 'daily',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Social Challenge',
    description: 'Attend a networking event',
    xp: 200,
    gold: 50,
    category: 'Social',
    frequency: 'challenge',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

function App() {
  const [stats, setStats] = useState<UserStats>(initialStats);
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [showQuestForm, setShowQuestForm] = useState(false);

  const handleQuestComplete = (quest: Quest) => {
    if (quest.completed) return;

    const newStats = { ...stats };
    newStats.xp += quest.xp;
    newStats.gold += quest.gold;

    // Level up logic
    while (newStats.xp >= newStats.nextLevelXp) {
      newStats.level += 1;
      newStats.xp -= newStats.nextLevelXp;
      newStats.nextLevelXp = Math.floor(newStats.nextLevelXp * 1.5);

      // Check for unlockable perks
      newStats.perks = newStats.perks.map(perk => ({
        ...perk,
        unlocked: perk.level <= newStats.level
      }));
    }

    setStats(newStats);
    setQuests(quests.map(q => 
      q.id === quest.id 
        ? { ...q, completed: true, completedAt: new Date().toISOString() }
        : q
    ));
  };

  const handleQuestUndo = (quest: Quest) => {
    if (!quest.completed) return;

    const newStats = { ...stats };
    newStats.xp -= quest.xp;
    newStats.gold -= quest.gold;

    // Handle negative values
    if (newStats.xp < 0) newStats.xp = 0;
    if (newStats.gold < 0) newStats.gold = 0;

    // Adjust level if necessary
    while (newStats.xp < 0 && newStats.level > 1) {
      newStats.level -= 1;
      newStats.nextLevelXp = Math.floor(newStats.nextLevelXp / 1.5);
      newStats.xp += newStats.nextLevelXp;
    }

    // Update perk status based on new level
    newStats.perks = newStats.perks.map(perk => ({
      ...perk,
      unlocked: perk.level <= newStats.level
    }));

    setStats(newStats);
    setQuests(quests.map(q => 
      q.id === quest.id 
        ? { ...q, completed: false, completedAt: undefined }
        : q
    ));
  };

  const handleQuestAdd = () => {
    setShowQuestForm(true);
  };

  const handleQuestSubmit = (questData: Omit<Quest, 'id' | 'completed' | 'createdAt' | 'completedAt'>) => {
    const newQuest: Quest = {
      ...questData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setQuests([...quests, newQuest]);
  };

  const handleStatsEdit = (newStats: Partial<UserStats>) => {
    setStats({ ...stats, ...newStats });
  };

  return (
    <>
      <Dashboard
        stats={stats}
        quests={quests}
        onQuestComplete={handleQuestComplete}
        onQuestUndo={handleQuestUndo}
        onQuestAdd={handleQuestAdd}
        onStatsEdit={handleStatsEdit}
      />
      {showQuestForm && (
        <QuestForm
          onSubmit={handleQuestSubmit}
          onClose={() => setShowQuestForm(false)}
          categories={stats.categories.map(c => c.name)}
        />
      )}
    </>
  );
}

export default App;