import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ImputationsService } from './imputations.service';
import { Imputation } from 'src/Imputations/Imputation.entity';

@Controller('imputations')
export class ImputationsController {
    
    constructor(private service: ImputationsService) { }

    @Get()
    getAll(){
        return this.service.getImputations();
    }

 
    @Get(':id')
    get(@Param() params) {
        return this.service.getImputation(params.id);
    }

   
    @Post()
    create(@Body() imputation: Imputation) {
        return this.service.createImputation(imputation);
    }

    @Put()
    update(@Body() imputation: Imputation) {
        return this.service.updateImputation(imputation);
    }

    @Delete(':id')
    deleteImputation(@Param() params) {
        return this.service.deleteImputation(params.id);
    }
}
