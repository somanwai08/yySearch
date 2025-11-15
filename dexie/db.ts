import Dexie, { type Table } from 'dexie';

export interface BubbleTea {
  id: number;
  name: string;
  isListed: boolean;
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
