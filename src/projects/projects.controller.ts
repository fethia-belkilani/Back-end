import { Controller, Get, Param, HttpStatus, HttpService, Res, Post, Body, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { ImputationsService } from './../imputations/imputations.service';
import { Imputation } from 'src/imputations/imputation.entity';
import { User } from 'src/users/user.entity';

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

     @Get('/projectimputations/:projectId/:date')
     getProjectWeekImputations(@Param() params, @Res() res: Response) {
         this.projectService.getProjectWeekImputations( params.projectId, params.date, data => {
             res.status(HttpStatus.OK).json(data);
         })
     }





  /*@Get('/import/:userId')
    async Importprojects(@Param() params, @Res() res: Response) {
        const axios = require('axios');
        var userId = params.userId
        console.log('dfksdlfmlksd')
        let user= new User(userId);
        const users= this.UserService.getUser(userId);

      axios.get('http://localhost:4000/projects/?user.id=' + userId)
            .then(resp => {
                const data = resp.data;
                console.log(data);
                data.forEach(p => {
                    const user=new User(userId)

                    const project: Project = new Project(p.id,p.title,user);
                    project.id = p.id;
                    project.name = p.title;
                    project.user=user
                    console.log(project.id)
                    let imputArr: Array<Imputation> = [];
                    getTime(params.userId, project.id, data => {
                        data.time_entries.forEach(element => {
                            let imputation: Imputation = new Imputation();
                            imputation.id = element.id;
                            imputation.date = element.spent_on;
                            imputation.hours = element.hours;
                            imputation.status ="Initial"
                            imputation.user=user
                            imputation.project=project
                        
                            console.log("pppp",project)
                            this.imputService.createImputation(imputation)
                            console.log(imputation);
                            imputArr.push(imputation);
                        });
                        console.log(project.imputations);
                        project.imputations.concat(imputArr)
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

*/





}
