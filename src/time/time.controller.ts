import { Controller, Get, Param, Post, Body, Query, Delete, Res, HttpStatus } from '@nestjs/common';
import Redmine = require('node-redmine');
import { Response, json } from 'express';
import { Project } from './../projects/project.entity';
import { Imputation } from 'src/imputations/imputation.entity';
import { ManyToMany } from 'typeorm';
import { importImputations } from 'src/redmine_utils';


@Controller('time')
export class TimeController {

  @Get(':user/:proj')
  async getTimes(@Param() params,@Res() res: Response) {
    /*getTime(params.user, params.proj, data => {
      let imputation:Imputation = new Imputation();
      data.time_entries.forEach(element => {
        imputation.id = element.id;
        imputation.date = element.spent_on;
        imputation.hours = element.hours;
      });
    });*/
/*    importImputations(params.user, params.proj, imput => {
      res.status(HttpStatus.OK).json(imput);
    })*/
  } 
  
  

   
    
  @Get(':user')
  async getProjects(@Param() params,@Res() res: Response) {
    getProject(params.user,data =>{
      res.status(HttpStatus.OK).json(data);
    });
  }  
  
}

function getTime(userId:number, projectId: number, callback) {
  const hostname = process.env.REDMINE_HOST || 'http://localhost:3000';
  const config = {
    apiKey: process.env.REDMINE_APIKEY || '12b77ffcd93f1259578bd20fe35b3b50480aa27e',  format: 'json'
  };
  const redmine = new Redmine(hostname, config);
  redmine.time_entries({"user_id":userId,"project_id":projectId}, (err, data) => {
     if (err) throw err;
     callback(data);
  });
}

function getProject(userId:number,callback) {
  const hostname = process.env.REDMINE_HOST || 'http://localhost:3000';
  const config = {
    apiKey: process.env.REDMINE_APIKEY || '12b77ffcd93f1259578bd20fe35b3b50480aa27e',  format: 'json'
  };
  const redmine = new Redmine(hostname, config);
   redmine.projects({"user_id":userId}, function(err, data) {
   if (err) throw err;
   callback(data);
});

  
}
