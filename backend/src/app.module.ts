import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SportsModule } from './sports/sports.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [UsersModule, SportsModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

