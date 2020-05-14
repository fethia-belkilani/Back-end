import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { Response, json } from 'express';



@Controller('events')
export class EventsController {
      
    constructor(private service: EventsService) { }

    @Get()
    getAll(){
        return this.service.getEvents();
    }

 
  /*  @Get(':id')
    get(@Param() params) {
        return this.service.getEvent(params.id);
    }
*/
   
    @Post()
    create(@Body() event: Event) {
        return this.service.createEvent(event);
    }

    @Put()
    update(@Body() event: Event) {
        return this.service.updateEvent(event);
    }

    @Delete(':id')
    deleteEvent(@Param() params) {
        return this.service.deleteEvent(params.id);
    }

    
    @Get(':date')
    getWeekEvent(@Param() params, @Res() res: Response) {
        this.service.getWeekEvents( params.date, data => {
            if (data)
           { 
            res.status(HttpStatus.OK).json(data);}

            else
            { console.log("no data")}

            
        })
    }
}
