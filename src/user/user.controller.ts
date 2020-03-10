import { Controller, Get } from '@nestjs/common';
import AD = require("activedirectory2");


@Controller('user')
export class UserController {
  @Get()
  async getActive() {

    const config = {
      //url: 'ldap://192.168.26.49:389',
      url: 'ldap://41.225.3.148:389',
      baseDN: 'CN=mgmtbind OU=timesheetmgmt OXIA,DC=oxia,DC=corp',
      username: 'CN=ldapbind,CN=Users,DC=oxia,DC=corp',
      password: 'Yos@2020'
    }

    const ad = new AD(config);

    exports.signin = (req , res , next) => {
      try {
        const {
          username,
          password
        } = req.body;

        ad.authenticate(username, password, function(err, auth) {

          if (err) throw err;


          if (auth) {

            console.log(auth, username);

            console.log('Authenticated!');
          }
          else {

            console.log('Authentication failed!');

          }
        });


      } catch (err) {
        res.json(err)
      }

    };

  }}
