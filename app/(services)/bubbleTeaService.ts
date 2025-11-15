import { db, type BubbleTea } from '@/dexie/db';

export class BubbleTeaService {
  public static async getBubbleTeas() {
    return await db.bubbleTeas.reverse().toArray();
  }

  public static getFields() {
    const { primKey, indexes } = db.bubbleTeas.schema;
    return [primKey, ...indexes]
      .map((spec) => spec.keyPath)
      .filter((field) => typeof field === 'string');
  }

  public static insertIfEmpty() {
    // TODO: Load all bubble tea data from JSON file
    this.getBubbleTeas().then(async (array) => {
      if (!array.length) {
        await db.bubbleTeas.put({ id: 99, name: 'Test Tea', isListed: true });
      }
    });
  }

  public static async listBubbleTea(data: BubbleTea) {
    // TODO: List one bubble tea
  }

  public static async delistBubbleTea(data: BubbleTea) {
    // TODO: Delist one bubble tea
  }

  public static async listAllBubbleTea() {
    // TODO: List all bubble teas
  }

  public static async delistAllBubbleTea() {
    // TODO: Delist all bubble teas
  }
}
