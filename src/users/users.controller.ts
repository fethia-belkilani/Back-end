import { Controller, Get, Param, Post, Body, Put, Delete} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import nodemailer = require('nodemailer');
import { MailerService } from '@nestjs-modules/mailer';

@Controller('users')
export class UsersController {

    constructor(private readonly mailerService: MailerService,private service: UsersService, @InjectRepository(User) private usersRepository: Repository<User>) { }

    @Get('')
    getAll(){
      return this.service.getUsers();
    }  
    
    




 
  
  @Get('exist/:user/:date')
  async hasNewTask(@Param() params) {
      return this.service.hasNewTask(params.user,params.date)
  }
     

  @Get('team/:user/:proj')
  async getProjectTeam(@Param() params) {
      return this.service.getCollabs(params.user,params.proj)
  }


  @Put('/role/:id/:role')
  async updateRole(@Param() params) {
   return this.service.updateRole(params.id,params.role)

  }


     @Post(':id1')
     async relation(@Param() params, @Body() collabs:User[]) {
         console.log(params.id1);
         console.log("aa"); 
         console.log(collabs);
        const u1:User= await this.usersRepository.findOne(params.id1, {
         relations: ["collaborators"]
       });
         collabs.forEach(user=>{
             console.log("user",user)
            const u2= this.usersRepository.findOne(user.id, {
                relations: ["collaborators"]
              });  
              u2.then(element => {
                console.log("element:",element) 
                u1.collaborators.push(element);   
              })
        })
        this.usersRepository.save(u1); 
     }
       

   

   /*@Post(':id1/:id2')
    async relation(@Param() params) {
        console.log(params.id1);
        console.log("aa"); 
        console.log(params.id2);
       const u1:User= await this.usersRepository.findOne(params.id1, {
        relations: ["collaborators"]
      });
       const u2:User= await this.usersRepository.findOne(params.id2);
       u1.collaborators.push(u2);
       this.usersRepository.save(u1);
       return u1;
    }*/


   
   

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }

   
    @Post()
    create(@Body() user: User) {
        return this.service.createUser(user);
    }

   @Put()
    update(@Body() user: User) {
        console.log("update from backend")
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }

}