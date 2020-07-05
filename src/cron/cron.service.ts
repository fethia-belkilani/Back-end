import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from './../users/users.service';
  




@Injectable()
export class CronService {
    constructor(private userService:UsersService){}



  // @Cron('0 16 * * 5')
   /* WeeklyMail() {
     console.log('Every 10 seconds');
     var maillist = 
     "fethia.belkilani@gmail.com";
      this.userService.sendmail(maillist)
 

    }
    */

}
   //0 16 * * 1-5
