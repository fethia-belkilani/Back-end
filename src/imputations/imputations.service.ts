import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Imputation } from './imputation.entity';


@Injectable()
export class ImputationsService {
    constructor(@InjectRepository(Imputation) private imputationsRepository: Repository<Imputation>) { }

    async createImputation(Imputation: Imputation) {
        this.imputationsRepository.save(Imputation)
    }

    async getImputations(): Promise<Imputation[]> {
        return await this.imputationsRepository.find(
            {
                select: ["id","hours","date","status"],relations: ["project"] ,
                
            });
    }


    async getImputation(_id: number): Promise<Imputation[]> {
        return await this.imputationsRepository.find({
            select: ["id","hours","date","status"],relations: ["user","project"],
            where: [{ "id": _id }]
        });
    }

    async getByUserAndProject(userId:number,projectId:number): Promise<Imputation[]> {
        return  await this.imputationsRepository.createQueryBuilder("imputation")
        .select(["imputation.id","imputation.hours","imputation.status","imputation.date"])
        .innerJoinAndSelect("imputation.user", "user", "user.id = :userId", { userId })
        .innerJoinAndSelect("imputation.project", "project", "project.id = :projectId", { projectId })
        .getMany()   
        }


    async updateImputation(imputation: Imputation) {
        this.imputationsRepository.save(imputation)
    }




    async deleteImputation(imputation: Imputation) {
        this.imputationsRepository.delete(imputation);
    }

 


}
