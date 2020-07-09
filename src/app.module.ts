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

import { MailerModule} from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';




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
  ScheduleModule.forRoot(),


  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: "timevioo@gmail.com",
        pass: "timevioo123",
      },
    },
    defaults: {
      from:' asma <timevioo@gmail.com>',
    },
    template: {
      dir: process.cwd() + '/templates/',
      adapter: new HandlebarsAdapter(), // or new PugAdapter()
      options: {
        strict: true,
      },
    },
  }),

 
  
],
  controllers: [AppController, TimeController, ActiveController],
  providers: [AppService, CronService],
})
export class AppModule {}
