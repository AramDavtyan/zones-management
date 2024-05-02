import { Injectable } from '@nestjs/common';
import { createObjectCsvWriter } from 'csv-writer';
import * as parse from 'csv-parser';
import { createReadStream } from 'fs';

@Injectable()
export class ZoneService {
  private csvPath: string = 'zones.csv';

  async createZone(zone: any): Promise<void> {
    const csvWriter = createObjectCsvWriter({
      path: this.csvPath,
      header: ['id', 'name', 'points'],
      append: true,
    });

    await csvWriter.writeRecords([zone]);
  }

  async deleteZone(zoneId: number): Promise<void> {
    const zones = await this.getZones();
    const filteredZones = zones.filter((zone) => zone.id !== zoneId);
    const csvWriter = createObjectCsvWriter({
      path: this.csvPath,
      header: ['id', 'name', 'points'],
      append: false,
    });

    await csvWriter.writeRecords(filteredZones);
  }

  async getZones(): Promise<any[]> {
    const results = [];
    return new Promise((resolve, reject) => {
      createReadStream(this.csvPath)
        .pipe(parse({ headers: true }))
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  }
}
