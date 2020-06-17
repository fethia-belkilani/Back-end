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
    @Get(':user/:project')
    getByUser(@Param() params) {
        return this.service.getByUserAndProject(params.user,params.project);
    }
   

   
    @Post()
    create(@Body() imputation: Imputation) {
        return this.service.createImputation(imputation);
    }

   @Put()
    update(@Body() imputation: Imputation) {
        return this.service.updateImputation(imputation);
    }


    @Put('/changestatus/:status')
    updateListImputations(@Param() params, @Body() listImputations: Imputation[]) {
        for (var i = 0; i < listImputations.length; i++) {
            (listImputations[i].status=params.status) 
            this.service.updateImputation(listImputations[i])
        }
     
    }



    @Delete(':id')
    deleteImputation(@Param() params) {
        return this.service.deleteImputation(params.id);
    }
   

}
