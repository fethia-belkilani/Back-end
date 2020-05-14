import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, HttpService, Res, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { Connection, Repository, Table, Any, Double } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getTime} from './../redmine_utils';
import { Imputation } from './../imputations/imputation.entity';
import { Response, json } from 'express';
import { ImputationsService } from './../imputations/imputations.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';




@Controller('projects')
export class ProjectsController {
    constructor(@InjectRepository(Project) private projectsRepository: Repository<Project>,
        private projectService: ProjectsService,private imputService: ImputationsService) { }
        
    private http: HttpService


    @Get('')
    getAll() {
        return this.projectService.getProjects();

    }
     @Get('user/:userId')
     getAllByUser(@Param() params) {
         return this.projectService.getProjectsByUser(params.userId)
     }

    @Get(':userId/:projectId')
    getByUser(@Param() params) {
        return this.projectService.getProjectByUser(params.userId, params.projectId)
    }

    @Get('/project/:id')
     get(@Param() params) {
         return this.projectService.getProject(params.id);
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

    @Get(':userId/:projectId/:date')
    getWeekImputations(@Param() params, @Res() res: Response) {
        this.projectService.getWeekImputations(params.userId, params.projectId, params.date, data => {
           // console.log(data)
            res.status(HttpStatus.OK).json(data);
        })
    }






 /*  @Get('/import/:userId')
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
*/






}
