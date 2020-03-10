import { Controller, Get, Param, Post, Body, Query, Delete } from '@nestjs/common';
import Redmine = require('node-redmine');

//this returns issues


@Controller('project')
export class ProjectController {

  @Get()
  async getProjects() {


    const hostname = process.env.REDMINE_HOST || 'http://localhost:3000';
    const config = {
      apiKey: process.env.REDMINE_APIKEY || '12b77ffcd93f1259578bd20fe35b3b50480aa27e',  format: 'json'

    };
    const redmine = new Redmine(hostname, config);

    const issues = await redmine.issues({limit: 2});
    console.log(issues);


  }


}
