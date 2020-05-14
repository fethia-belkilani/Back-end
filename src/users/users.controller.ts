import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, HttpService, Res, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { Any, getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './update.dto';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService, @InjectRepository(User) private usersRepository: Repository<User>) { }

    @Get('')
    getAll(){
      return this.service.getUsers();
}

  /*const u2 = new User();
  u2.id=23;
  u2.name = "user2";
  u2.role='C';
  this.service.createUser(u2);


     const u1 = new User();
     u1.id=22;
     u1.name = "user1";
     u1.role='V';

     this.service.createUser(u1);
     u1.collaborators=[u2];*/
       
     

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
       // return u1;
     }
       

   

 /*  @Post(':id1/:id2')
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



    //let u2 = await this.usersRepository.findOneOrFail(params.id2);
    //u1.collaborators=[u2];

  
        //let u2 = await this.usersRepository.findOneOrFail(id2);
        //u1.collaborators=[u2];
        //this.service.updateUser(u1);
    /*

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }

   
    @Post()
    create(@Body() user: User) {
        return this.service.createUser(user);
    }
*/
  /*  @Put()
    update(@Body() user: User) {
        console.log("update from backend")
        return this.service.updateUser(user);
    }*/

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }

}