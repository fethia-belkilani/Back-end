import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeController } from './time/time.controller';
import { ActiveController } from './active/active.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ImputationModule } from './imputations/imputation.module';
import { User } from './users/user.entity';
import { Imputation } from './imputations/imputation.entity';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/project.entity';



@Module({
  imports: [ 
UsersModule,
  TypeOrmModule.forRoot({
  "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "imput_manage",
    //"entities": ["src/**/**.entity{.ts,.js}"],
    "entities": [User,Imputation,Project],
    synchronize: true,

  }),
  ImputationModule,
  ProjectsModule,
  
 
],
  controllers: [AppController, TimeController, ActiveController],
  providers: [AppService],
})
export class AppModule {}
