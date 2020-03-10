import { Controller, Get, Param, Post, Body, Query, Delete, Res, HttpStatus } from '@nestjs/common';
import Redmine = require('node-redmine');
import { Response } from 'express';


@Controller('time')
export class TimeController {

  @Get()
  async getTimes(@Res() res: Response) {
    //const books = await this.booksService.getBooks();
    //return books;

    const hostname = process.env.REDMINE_HOST || 'http://localhost:3000';
    const config = {
      apiKey: process.env.REDMINE_APIKEY || '12b77ffcd93f1259578bd20fe35b3b50480aa27e',  format: 'json'

    };
    const redmine = new Redmine(hostname, config);
    redmine.time_entries({include: "id, project_id, hours"}, (err, data) => {
      if (err) throw err;
      //console.log(data);
      res.status(HttpStatus.OK).json(data);
    });
  }

}
