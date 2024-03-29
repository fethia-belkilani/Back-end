import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, Double, FindManyOptions } from 'typeorm';
import { Project } from './project.entity';
import moment from 'moment'
import { ImputationsService } from 'src/imputations/imputations.service';
import { UsersService } from './../users/users.service';


@Injectable()
export class ProjectsService {
    constructor(@InjectRepository(Project) private projectsRepository: Repository<Project>,
        private imputService: ImputationsService, private userService: UsersService) { }


    async createProject(project: Project) {
        this.projectsRepository.save(project)
    }

    async getProjects(): Promise<Project[]> {
        return await this.projectsRepository.find(
            {
                select: ["id", "name"], relations: ["imputations", "users"]
            }
        );
    }
    async getProjectsByUser(userId: number): Promise<Project[]> {
        return await this.projectsRepository.createQueryBuilder("project")
            .select(["project.id", "project.name"])
            .innerJoin("project.users", "user", "user.id = :userId", { userId })
            .getMany()
    }


    async getProjectByUser(userId: number, projectId: number): Promise<Project[]> {
        return await this.projectsRepository.createQueryBuilder("project")
            .select(["project.id", "project.name"])
            .leftJoinAndSelect("project.imputations", "imputations")
            .innerJoinAndSelect("project.users", "user", "user.id = :userId", { userId })
            .where("project.id= :id", { id: projectId })
            .getMany()
    }

    async getProjectUsers(projectId: number): Promise<Project[]> {
        return await this.projectsRepository.createQueryBuilder("project")
            .select(["project.id"])
            .innerJoinAndSelect("project.users", "users")
            .where("project.id= :id", { id: projectId })
            .getMany()
    }

    async getP(_id: number): Promise<Project[]> {
        return await this.projectsRepository.find({
            select: ["name"], relations: ['imputations'],
            where: [{ "id": _id }]
        });
    }

    async getProject(id: number): Promise<Project> {
        return await this.projectsRepository.createQueryBuilder("project")
            .select(["project.name"])
            .innerJoinAndSelect("project.imputations", "imputation", "imputation.project.id = :id", { id })
            .getOne()
    }

    async updateProject(project: Project) {
        this.projectsRepository.save(project)
    }

    async deleteProject(project: Project) {
        this.projectsRepository.delete(project);
    }

    async getProjectWeekImputations(projectId: number, date: Date, callback) {
        var tab: Array<number> = [0, 0, 0, 0, 0, 0, 0]
        var myDate = moment(moment.utc(date).format('YYYY-MM-DD'))
        this.getProject(projectId).then(res => {
            res.imputations.forEach(imput => {
                var imputDate = moment(moment.utc(imput.date).format('YYYY-MM-DD'))
                if (imputDate.isSame(myDate, "week"))

                    switch (imputDate.day()) {
                        case 1:
                            tab[0] += Number(imput.hours) * 8;
                            break;
                        case 2:
                            tab[1] += Number(imput.hours) * 8;
                            break;
                        case 3:
                            tab[2] += Number(imput.hours) * 8;
                            break;
                        case 4:
                            tab[3] += Number(imput.hours) * 8;
                            break;
                        case 5:
                            tab[4] += Number(imput.hours) * 8;
                            break;

                    }
            })
            callback(tab)
        }).catch(error => {
            console.log(error)
        });
    }

}
