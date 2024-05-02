import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZoneModule } from './zone/zone.module';

@Module({
  imports: [ZoneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
