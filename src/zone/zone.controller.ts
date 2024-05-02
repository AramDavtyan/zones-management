import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { ZoneService } from './zone.service';

@Controller('zones')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post()
  create(
    @Body() createZoneDto: { name: string; points: number[][] },
  ): Promise<void> {
    const zoneId = Date.now(); // Simple ID generation
    return this.zoneService.createZone({ ...createZoneDto, id: zoneId });
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.zoneService.deleteZone(id);
  }

  @Get()
  findAll() {
    return this.zoneService.getZones();
  }
}
