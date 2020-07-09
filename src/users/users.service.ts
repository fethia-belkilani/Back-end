import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import moment from 'moment';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private readonly mailerService: MailerService) { }

  async createUser(user: User) {
    this.usersRepository.save(user)
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ["id", "name", "isValidator"], relations: ['collaborators', 'validators', 'projects']
    });
  }


  async getUser(_id: number): Promise<User> {
    /* return await this.usersRepository.find({
         select: ["name", "isValidator"],relations: ['collaborators','validators','projects'],
         where: [{ "id": _id }]
     });*/

    const options: FindOneOptions<User> = {
      where: [{ "id": _id }],
      relations: ['collaborators', 'validators', 'projects']
    }

    return this.usersRepository.findOne(options);

  }

  async updateUser(user: User) {
    this.usersRepository.save(user)
  }


  async deleteUser(user: User) {
    this.usersRepository.delete(user);
  }
  async updateRole(userId: number, role: string) {
    var r = false
    if (role == "true") r = true
    const u: User = await this.usersRepository.findOne(userId);
    u.isValidator = r;
    this.usersRepository.save(u);
  }


  async hasNewTask(id: number, datee: Date): Promise<Boolean> {
    var date = new Date(datee)
    const result = await this.usersRepository.createQueryBuilder("user")
      .where("user.id= :id", { id: id })
      .leftJoinAndSelect("user.imputations", "imputations")
      .innerJoin("user.imputations", "imputation", "imputation.date = :date", { date })
      .getOne();
    return result !== undefined;

  }
//      .innerJoinAndSelect("user.collaborators", "collaborators")

  async getCollabs(userId: number, projectId: number): Promise<User[]> {
    return await this.usersRepository.createQueryBuilder("user")
      .select(["user.id", "user.name"])
      .innerJoin("user.validators", "validator", "validator.id = :userId", { userId })
      .innerJoin("user.projects", "project", "project.id = :id", { id: projectId })
      .getMany()
  }

  sendmail(maillist: string) {
    this.mailerService.sendMail({
      to: maillist, // list of receivers
      from: ' Time-vioo <timevioo@gmail.com>',//sender
      subject: 'Valider vos activités', // Subject line
      text: '', // plaintext body
      html: "<p>Vous avez de nouvelles demandes d'approbation en attente, veuillez consulter votre espace de travail</p>"
    })
      .then((success) => {
        console.log(success)
      })
      .catch((err) => {
        console.log(err)
      });
  }


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

