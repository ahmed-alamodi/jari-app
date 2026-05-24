import Dexie, { type EntityTable } from 'dexie';

export interface DhikrProgress {
  id: string; // e.g. "m1-2023-10-25" (id + date)
  dhikrId: string;
  date: string; // YYYY-MM-DD
  countCompleted: number;
}

export interface UserPreference {
  key: string;
  value: any;
}

export interface Streak {
  date: string; // YYYY-MM-DD
  completedMorning: boolean;
  completedEvening: boolean;
  tasbeehCount: number;
}

const db = new Dexie('JariDatabase') as Dexie & {
  progress: EntityTable<DhikrProgress, 'id'>;
  preferences: EntityTable<UserPreference, 'key'>;
  streaks: EntityTable<Streak, 'date'>;
};

db.version(1).stores({
  progress: 'id, dhikrId, date',
  preferences: 'key',
  streaks: 'date'
});

export { db };
