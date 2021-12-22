import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  getStatus(service: string[]) {
    const response = [];
    for (let i = 0; i < service.length; i++) {
      if(service[i] === 'funcore' || service[i] === 'DWH'){
        response.push({
          service: service[i],
          status: 'Ok',
          data: 'Service is available'
        })
      } else {
        response.push({
          service: service[i],
          status: 'Error',
          data: 'Service is not available'
        })
      }
    }
    return JSON.stringify(response)
  }
}
