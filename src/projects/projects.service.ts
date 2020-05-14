import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import moment from 'moment'
import { Imputation } from './../imputations/imputation.entity';


@Injectable()
export class ProjectsService {
    constructor(@InjectRepository(Project) private projectsRepository: Repository<Project>) { }
    

    async createProject(project: Project) {
        this.projectsRepository.save(project)     
    }

    async getProjects(): Promise<Project[]> {
        return await this.projectsRepository.find(
            {
                select: ["id","name"],relations: ["imputations","users"] 
                
            }
        );
    }
    async getProjectsByUser(userId:number): Promise<Project[]> {
    return  await this.projectsRepository.createQueryBuilder("project")
    .select(["project.id","project.name"])
    .leftJoinAndSelect("project.imputations","imputations")
    .innerJoinAndSelect("project.users", "user", "user.id = :userId", { userId })
    .getMany()   
    }
    async getProjectByUser(userId:number,projectId:number): Promise<Project[]> {
        return  await this.projectsRepository.createQueryBuilder("project")
        .select(["project.id","project.name"])
        .leftJoinAndSelect("project.imputations","imputations")
        .innerJoinAndSelect("project.users", "user", "user.id = :userId", { userId })
        .where("project.id= :id",{id:projectId})
        .getMany()   
        }
    
    async getProject(_id: number): Promise<Project[]> {
        return await this.projectsRepository.find({
            select: ["id", "name"],relations: ['imputations'] ,
            where: [{ "id": _id }]

        });
    }

    async updateProject(project: Project) {
        this.projectsRepository.save(project)
    }

    async deleteProject(project: Project) {
        this.projectsRepository.delete(project);
    }
       
    
    async getWeekImputations(userId:number,projectId:number,date:Date,callback){
        var tab: Array<Imputation>=[]
        var myDate=moment.utc(date).format('YYYY-MM-DD')
        this.getProjectByUser(userId,projectId).then(res=>{
            res.forEach(p=>{
                p.imputations.forEach(imput=>{
                    var imputDate=moment.utc(imput.date).format('YYYY-MM-DD')
                    if         (  moment(imputDate).isSame( moment(myDate),"week"))
                        tab.push(imput)
                      //  callback(tab)

                })                
            })
            callback(tab)
        }).catch(error => {
            console.log(error);
        });       
    }

    



    
    


    

}
