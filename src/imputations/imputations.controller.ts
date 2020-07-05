import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { ImputationsService } from './imputations.service';
import { Imputation } from 'src/Imputations/Imputation.entity';
import { Response } from 'express';

@Controller('imputations')
export class ImputationsController {

    constructor(private service: ImputationsService) { }

    @Get()
    getAll() {
        return this.service.getImputations();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getImputation(params.id);
    }

    @Get(':user/:project')
    getByUser(@Param() params) {
        return this.service.getByUserAndProject(params.user, params.project);
    }

    @Post()
    create( @Body() imputation: Imputation, @Res() res: Response) {
        this.service.validTotal(imputation.user.id,imputation.date,imputation.hours).then(valid => {
            if (valid === true) {
                this.service.createImputation(imputation).then(imput => {
                    return res.status(HttpStatus.OK).json(imput);
                });
            }
            else {
                return res.status(HttpStatus.NOT_ACCEPTABLE).json({ error: "invalid total imputation" });
            }
        })

    }

    
    /*@Post()
    create( @Body() imputation: Imputation, @Res() res: Response) {
            
                this.service.createImputation(imputation).then(imput => {
                    return res.status(HttpStatus.OK).json(imput);
                });
            
    }*/

 /*  @Get('/valid/:userId/:date')
    validg(@Param() params) {
       return  this.service.validTotal(params.userId, params.date)  }
*/

    @Put()
    update(@Body() imputation: Imputation) {
        return this.service.updateImputation(imputation);
    }

    @Get('/weekimputations/:userId/:projectId/:date')
    getWeekimp(@Param() params) {
        return this.service.getWeekImputations(params.userId, params.projectId, params.date)
    }

    @Get('/sentweekimputations/:userId/:projectId/:date')
    getSent(@Param() params) {
        return this.service.getSentWeekImputations(params.userId, params.projectId, params.date)
    }

    @Put('/changestatus/:status')
    updateListImputations(@Param() params, @Body() listImputations: Imputation[], @Res() res: Response) {
        for (var i = 0; i < listImputations.length; i++) {
            listImputations[i].status = params.status
            this.service.updateImputation(listImputations[i])
        }
        return res.status(HttpStatus.OK).json(listImputations);
    }

    @Get('/sum/:userId/:projectId')
    sumHours(@Param() params) {
        return this.service.sumHours(params.userId, params.projectId)

    }
   /* @Get('/valid/:userId/:date')
    valid(@Param() params) {
        return this.service.validTotal(params.userId, params.date)
    }*/

    @Delete(':id')
    deleteImputation(@Param() params) {
        return this.service.deleteImputation(params.id);
    }


}
