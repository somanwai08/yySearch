import Dexie, { type Table } from 'dexie';

export const db = new Dexie('BubbleTeaDB') as Dexie & {
  bubbleTeas: Table<BubbleTea, number>;
};

db.version(1).stores({
  bubbleTeas: '++id, name, isListed',
});

export interface BubbleTea {
  id: number;
  name: string;
  isListed: boolean;
}
