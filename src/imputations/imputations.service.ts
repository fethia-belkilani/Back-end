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
                select: ["id","hours","date","state"],relations: ["project"] ,
                
            });
    }


    async getImputation(_id: number): Promise<Imputation[]> {
        return await this.imputationsRepository.find({
            select: ["id","hours","date","state"],relations: ["user","project"],
            where: [{ "id": _id }]
        });
    }


    async updateImputation(imputation: Imputation) {
        this.imputationsRepository.save(imputation)
    }

    async deleteImputation(imputation: Imputation) {
        this.imputationsRepository.delete(imputation);
    }

 


}
