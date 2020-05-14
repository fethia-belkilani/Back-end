import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import moment from 'moment';


@Injectable()
export class EventsService { 
    constructor(@InjectRepository(Event) private eventsRepository: Repository<Event>) { }

async createEvent(event: Event) {
    this.eventsRepository.save(event)
}

async getEvents(): Promise<Event[]> {
    return await this.eventsRepository.find();  
  }


async getEvent(_id: number): Promise<Event[]> {
    return await this.eventsRepository.find({
        select: ["title","start","end"],
        where: [{ "id": _id }]
    });
}

async updateEvent(event: Event) {
    this.eventsRepository.save(event)
}

async deleteEvent(event: Event) {
    this.eventsRepository.delete(event);
}
async getWeekEvents(date:Date,callback){
    var tab: Array<Event>=[]
    var myDate=moment.utc(date).format('YYYY-MM-DD')
    this.getEvents().then(res=>{
        res.forEach(e=>{
            var eventDate=moment.utc(e.start).format('YYYY-MM-DD')
            if (  moment(eventDate).isSame( moment(myDate),"week"))
            tab.push(e)           
        })
        callback(tab)
    }).catch(error => {
        console.log(error);
    });       
}
}
