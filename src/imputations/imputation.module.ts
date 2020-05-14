import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImputationsController } from './imputations.controller';
import { Imputation } from './imputation.entity';
import { ImputationsService } from './imputations.service';


@Module({
    imports: [TypeOrmModule.forFeature([Imputation])],
    exports:[ImputationsService],

    providers: [ImputationsService],
    controllers: [ImputationsController]
  })
export class ImputationModule {}
