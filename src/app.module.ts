import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectController } from './project/project.controller';
import { TimeController } from './time/time.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectController, TimeController],
  providers: [AppService],
})
export class AppModule {}
