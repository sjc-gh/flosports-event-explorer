import { Module } from '@nestjs/common';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';
import { EventDatabase } from '../data/event-database';

@Module({
  controllers: [SportsController],
  providers: [SportsService, EventDatabase]
})
export class SportsModule {}