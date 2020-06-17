import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async createUser(user: User) {
        this.usersRepository.save(user)
    }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({
            select: ["id","name", "isValidator"],relations: ['collaborators','validators','projects']
        });    }


    async getUser(_id: number): Promise<User> {


       /* return await this.usersRepository.find({
            select: ["name", "isValidator"],relations: ['collaborators','validators','projects'],
            where: [{ "id": _id }]
        });*/

         const options: FindOneOptions<User> = {
            where: [{ "id": _id }],
            relations: [ 'collaborators','validators','projects']
          }
          
         return this.usersRepository.findOne(options);
       
    }
   


    


    async updateUser(user: User) {
        this.usersRepository.save(user)
    }
    

    async deleteUser(user: User) {
        this.usersRepository.delete(user);
    }

    


   /* async updatecollab(idValidator:number,listCollab:number[]) {
        let validatorToUpdate = await this.usersRepository.findOne(idValidator);
        listCollab.forEach(id=>
            {let collab= this.usersRepository.findOne(id)
            validatorToUpdate.collaborators.push(collab)
            })
        let updated = Object.assign(validatorToUpdate,dto);
        return await this.usersRepository.save(updated);
    }*/
}
