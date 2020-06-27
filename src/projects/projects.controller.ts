import { Controller, Get, Param, HttpStatus, HttpService, Res, Post, Body, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { ImputationsService } from './../imputations/imputations.service';
import { Imputation } from 'src/imputations/imputation.entity';
import { getTime } from 'src/redmine_utils';




@Controller('projects')
export class ProjectsController {
    constructor(@InjectRepository(Project) private projectsRepository: Repository<Project>,
        private projectService: ProjectsService,private imputService: ImputationsService) { }
        
    private http: HttpService
    @Get(':id')
    get(@Param() params) {
        return this.projectService.getP(params.id);
    }

    @Get('')
    getAll() {
        return this.projectService.getProjects();

    }
     @Get('user/:userId')
     getAllByUser(@Param() params) {
         return this.projectService.getProjectsByUser(params.userId)
     }

     @Get('c/:id')
     async ff(@Param() params) {
         return this.projectService.getProjectUsers(params.id)
     }
     



    



     @Get('val/:userId')
     ValidHimself(@Param() params) {
         return this.projectService.ValidHimself(params.userId) 
     } 
    



    @Get('give/:userId/:projectId')
    getByUser(@Param() params) {
        return this.projectService.getProjectByUser(params.userId, params.projectId)
    }

  

    @Post()
    create(@Body() project: Project) {
        return this.projectService.createProject(project);
    }

    @Put()
    update(@Body() project: Project) {
        return this.projectService.updateProject(project);
    }

     @Delete(':id')
     deleteProject(@Param() param) {
         return this.projectService.deleteProject(param.id);
     }







  @Get('/import/:userId')
    async Importprojects(@Param() params, @Res() res: Response) {
        const axios = require('axios');
        var userId = params.userId
        console.log('dfksdlfmlksd')
       // let user=new User();
       // const users= this.UserService.getUser(userId);

      axios.get('http://localhost:4000/projects/?user.id=' + userId)
            .then(resp => {
                const data = resp.data;
                console.log(data);
                data.forEach(p => {
                    const project: Project = new Project();
                    project.id = p.id;
                    project.name = p.title;
                    console.log(project.id)
                    let imputArr: Array<Imputation> = [];
                    getTime(params.userId, project.id, data => {
                        data.time_entries.forEach(element => {
                            let imputation: Imputation = new Imputation();
                            imputation.id = element.id;
                            imputation.date = element.spent_on;
                            imputation.hours = element.hours;
                            imputation.status ="Initial"
                        
                            console.log(imputation)
                            this.imputService.createImputation(imputation)
                            console.log(imputation);
                            imputArr.push(imputation);
                        });
                        project.imputations = imputArr
                        const proj: Project = this.projectsRepository.create(project);
                        this.projectsRepository.save(proj);
                        

                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
        this.projectService.getProjectsByUser(userId).then(data => {
           res.status(HttpStatus.OK).json(data);
        })
    }





  







@Get('/projectimputations/:projectId/:date')
getProjectWeekImputations(@Param() params, @Res() res: Response) {
    this.projectService.getProjectWeekImputations( params.projectId, params.date, data => {
       // console.log(data)
        res.status(HttpStatus.OK).json(data);
    })
}


////////////////////////////////////////with callbacks

/*@Get('/weekimputations/:userId/:projectId/:date')
getWeekImputations(@Param() params, @Res() res: Response) {
    this.projectService.getWeekImputations(params.userId, params.projectId, params.date, data => {
       // console.log(data)
        res.status(HttpStatus.OK).json(data);
    })
}


@Get('/sentweekimputations/:userId/:projectId/:date')
getSentWeekImputations(@Param() params, @Res() res: Response) {
    this.projectService.getSentWeekImputations(params.userId, params.projectId, params.date, data => {
        res.status(HttpStatus.OK).json(data);
    })
}

 @Get('user/:userId/project/:projectId')
     getProjectCollabs(@Param() params, @Res() res: Response) {
    this.projectService.getProjectCollabs(params.userId, params.projectId,  data => {
       console.log(data)
        res.status(HttpStatus.OK).json(data);
    })
     }
*/



}
