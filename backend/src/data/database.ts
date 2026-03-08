import * as fs from 'fs';
import * as path from 'path';

// [Trade-Off]
// This is a simple in-memory database implementation that reads data from a JSON file.  It provides basic methods
// to find all records and find a record by ID.  This approach is suitable for the purposes of this project, but in
// production code the data would ideally originate from a true database like PostreSQL or DynamoDB.
export class Database<T> {
  private data: T[] = [];
  private dataMap: Record<string, T> = {};

  constructor(asset: string, getId: (item: T) => string) {
    const eventsPath = path.join(__dirname, `../assets/${asset}.json`);
    const eventsData = fs.readFileSync(eventsPath, 'utf8');

    this.data = JSON.parse(eventsData);
    this.dataMap = this.data.reduce((map, item) => {
      map[getId(item)] = item;
      return map;
    }, {} as Record<string, T>);
  }

  findAll(): ReadonlyArray<T> {
    return this.data;
  }

  findOne(id: string): T {
    return this.dataMap[id];
  }
}
