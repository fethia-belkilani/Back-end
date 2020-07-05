import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imputation } from './imputation.entity';


@Injectable()
export class ImputationsService {
    constructor(@InjectRepository(Imputation) private imputationsRepository: Repository<Imputation>) { }

    async createImputation(Imputation: Imputation) {
        return this.imputationsRepository.save(Imputation)
    }

    async getImputations(): Promise<Imputation[]> {
        return await this.imputationsRepository.find(
            {
                select: ["id", "hours", "date", "status"], relations: ["project"],

            });
    }

    async getImputation(_id: number): Promise<Imputation[]> {
        return await this.imputationsRepository.find({
            select: ["id", "hours", "date", "status"], relations: ["user", "project"],
            where: [{ "id": _id }]
        });
    }

    async getByUserAndProject(userId: number, projectId: number): Promise<Imputation[]> {
        return await this.imputationsRepository.createQueryBuilder("imputation")
            .select(["imputation.id", "imputation.hours", "imputation.status", "imputation.date"])
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

    async getWeekImputations(userId: number, projectId: number, date: Date): Promise<Imputation[]> {
        return await this.imputationsRepository.createQueryBuilder("imputation")
            .select(["imputation.id", "imputation.hours", "imputation.date", "imputation.status"])
            .innerJoin("imputation.user", "user", "user.id = :userId", { userId })
            .innerJoinAndSelect("imputation.project", "project", "project.id = :projectId", { projectId })
            .where("WEEK(imputation.date)=WEEK(:d)", { d: date })
            .orderBy("imputation.date")
            .getMany()
    }

    async getSentWeekImputations(userId: number, projectId: number, date: Date): Promise<Imputation[]> {
        return await this.imputationsRepository.createQueryBuilder("imputation")
            .select(["imputation.id", "imputation.hours", "imputation.date", "imputation.status"])
            .innerJoin("imputation.user", "user", "user.id = :userId", { userId })
            .innerJoin("imputation.project", "project", "project.id = :projectId", { projectId })
            .where("WEEK(imputation.date)=WEEK(:d)", { d: date })
            .andWhere("imputation.status= :status", { status: 'Sent' })
            .orderBy("imputation.date")
            .getMany()
    }

    async sumHours(userId: number, projectId: number) {
        return await this.imputationsRepository.createQueryBuilder("imputation")
            .select("imputation.status")
            .addSelect("SUM((imputation.hours )*4)", "count")
            .groupBy("imputation.status")
            .innerJoin("imputation.user", "user", "user.id = :userId", { userId })
            .innerJoin("imputation.project", "project", "project.id = :projectId", { projectId })
            .getRawMany()
    }

    async validTotal(userId: number, datee: Date): Promise<Boolean> {
        var date = new Date(datee)
        const result = await this.imputationsRepository.createQueryBuilder("imputation")
            .select("SUM(imputation.hours )", "sum")
            .innerJoin("imputation.user", "user", "user.id = :userId", { userId })
            .where("imputation.date=:date", { date: date })
            .getRawOne();
        return (result.sum <= 1)
    }

    
}
