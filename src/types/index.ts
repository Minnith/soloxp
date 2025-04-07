export interface Quest {
  id: string;
  name: string;
  description: string;
  xp: number;
  gold: number;
  category: string;
  frequency: 'daily' | 'weekly' | 'challenge';
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Perk {
  id: string;
  name: string;
  description: string;
  level: number;
  unlocked: boolean;
  cost?: number; // Gold cost if purchasable
}

export interface UserStats {
  level: number;
  xp: number;
  gold: number;
  nextLevelXp: number;
  categories: Category[];
  perks: Perk[];
}