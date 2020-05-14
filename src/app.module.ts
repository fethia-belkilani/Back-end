import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeController } from './time/time.controller';
import { ActiveController } from './active/active.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Imputation } from './imputations/imputation.entity';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/project.entity';
import { EventsModule } from './events/events.module';
import { Event } from './events/event.entity';





@Module({
  imports: [ 
UsersModule,
ProjectsModule,
EventsModule,
  TypeOrmModule.forRoot({
  "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "", 
    "database": "pfe_backend",
    //"entities":["src/**/**.entity{.ts,.js}"],
    "entities": [User,Imputation,Project,Event],
     synchronize: true,
  }),
 
  
],
  controllers: [AppController, TimeController, ActiveController],
  providers: [AppService],
})
export class AppModule {}
