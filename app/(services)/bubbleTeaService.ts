import { db, type BubbleTea } from '@/dexie/db';
import bubbleTeasData from '@/data/bubbleTeas.json';

export class BubbleTeaService {
  public static async getBubbleTeas() {
    return await db.bubbleTeas.reverse().toArray();
  }

  public static async getListedBubbleTeas() {
    return await db.bubbleTeas.filter(tea => tea.isListed === true).toArray();
  }

  public static getFields() {
    // Return all fields from the BubbleTea interface
    return ['originalId', 'name', 'description', 'currency', 'price', 'labels'];
  }

  public static insertIfEmpty() {
    this.getBubbleTeas().then(async (array) => {
      if (!array.length) {
        // Load all bubble tea data from JSON file
        const teasWithListedFlag = bubbleTeasData.map((tea) => ({
          originalId: tea.id,
          assetPath: tea.assetPath,
          name: tea.name,
          description: tea.description,
          currency: tea.currency,
          price: tea.price,
          labels: tea.labels,
          isListed: true,
        }));
        await db.bubbleTeas.bulkAdd(teasWithListedFlag);
      }
    });
  }

  public static async listBubbleTea(data: BubbleTea) {
    if (data.id) {
      await db.bubbleTeas.update(data.id, { isListed: true });
    }
  }

  public static async delistBubbleTea(data: BubbleTea) {
    if (data.id) {
      await db.bubbleTeas.update(data.id, { isListed: false });
    }
  }

  public static async listAllBubbleTea() {
    const allTeas = await db.bubbleTeas.toArray();
    const updates = allTeas.map((tea) => {
      if (tea.id !== undefined) {
        return db.bubbleTeas.update(tea.id, { isListed: true });
      }
      return Promise.resolve();
    });
    await Promise.all(updates);
  }

  public static async delistAllBubbleTea() {
    const allTeas = await db.bubbleTeas.toArray();
    const updates = allTeas.map((tea) => {
      if (tea.id !== undefined) {
        return db.bubbleTeas.update(tea.id, { isListed: false });
      }
      return Promise.resolve();
    });
    await Promise.all(updates);
  }
}
