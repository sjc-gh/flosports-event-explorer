import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SportsModule } from './sports/sports.module';
import { EventModule } from './event/event.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [SportsModule, EventModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

