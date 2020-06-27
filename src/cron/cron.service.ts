import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from './../users/users.service';
  




@Injectable()
export class CronService {
    constructor(private userService:UsersService){}



  // @Cron('*/10 * * * * *')
   /* runEvery10Seconds() {
     console.log('Every 10 seconds');
     var maillist = 
     "fethia.belkilani@gmail.com,asma.aliasma22@gmail.com,salim.bnhassine@gmail.com";
      this.userService.sendmail(maillist)
 

    }
    */
}
