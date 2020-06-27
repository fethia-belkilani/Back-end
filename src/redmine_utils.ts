import Redmine = require('node-redmine');

import { Imputation } from './imputations/imputation.entity';

export function getTime(userId:number, projectId: number, callback) {
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

export function importImputations(userId:number, projectId: number, callback) {
  let imputArr: Array<Imputation> = [];
  getTime(userId, projectId, data => {
    data.time_entries.forEach(element => {
      let imputation:Imputation = new Imputation();
      imputation.id = element.id;
      imputation.date = element.spent_on;
      imputation.hours = element.hours;
      imputArr.push(imputation);
    });
   //callback(imputArr)
   
  });
}

export function getProject(userId:number,callback) {
  const hostname = process.env.REDMINE_HOST || 'http://localhost:3000';
  const config = {
    apiKey: process.env.REDMINE_APIKEY || '12b77ffcd93f1259578bd20fe35b3b50480aa27e',  format: 'json'
  };
  const redmine = new Redmine(hostname, config);
   redmine.projects({"user_id":userId}, function(err, data) {
   if (err) throw err;
   callback(data);
});}
