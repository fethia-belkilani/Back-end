import { Module, HttpService } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImputationsService } from './../imputations/imputations.service';
import { ImputationModule } from 'src/imputations/imputation.module';
import { UsersModule } from './../users/users.module';





@Module({
  imports: [TypeOrmModule.forFeature([Project]),ImputationModule, UsersModule],

  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
