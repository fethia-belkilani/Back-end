import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectController } from './project/project.controller';
import { TimeController } from './time/time.controller';
import { UserController } from './user/user.controller';
import { ActiveDirectoryController } from './active-directory/active-directory.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectController, TimeController, UserController, ActiveDirectoryController],
  providers: [AppService],
})
export class AppModule {}
