import { Controller ,Get,Post} from '@nestjs/common';
import AD = require("activedirectory2");

@Controller('active')
export class ActiveController {
    @Post()
    authenticate() {
        const config = {
          url: 'ldap://192.168.26.49:389',
          //url: 'ldap://41.225.3.148:389',
          baseDN: 'CN=mgmtbind OU=timesheetmgmt OXIA,DC=oxia,DC=corp'}
    
        const ad= new AD(config);
        const  username= 'mgmtbind';
        const  password = 'MgmtSheeT@';
    
    
    // Authenticate
        ad.authenticate(username,password,function(err, auth) {
    
          // if (err) throw err;
    
          if (auth) {
            console.log('Authenticated!');
          }
          else {
            console.log(err);
            console.log('Authentication failed!');
          }
        });
    
    
      }
}
