import Dexie, { type Table } from 'dexie';

export interface BubbleTea {
  id?: number;
  originalId: number;
  assetPath: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  labels: string[];
  isListed?: boolean;
}

export interface CartItem {
  id?: number;
  teaId: number;
  name: string;
  quantity: number;
  price?: number;
}

export const db = new Dexie('BubbleTeaDB') as Dexie & {
  bubbleTeas: Table<BubbleTea, number>;
  cart: Table<CartItem, number>;
};

db.version(1).stores({
  bubbleTeas: '++id, name, isListed',
});

db.version(2).stores({
  bubbleTeas: '++id, name, isListed',
  cart: '++id, teaId',
});

// Version 3: Keep the same schema but upgrade will trigger data migration
db.version(3).stores({
  bubbleTeas: '++id, name, isListed, originalId',
  cart: '++id, teaId',
}).upgrade(async (trans) => {
  // Clear old data and prepare for new structure
  await trans.table('bubbleTeas').clear();
});
