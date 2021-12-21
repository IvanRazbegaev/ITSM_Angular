import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  getStatus(service: string) {
    if (service === 'funcore' || service === 'producer'){
      return JSON.stringify(['Ok', 'Service is available']);
    } else {
      return JSON.stringify(['Error', 'Service is not available']);
    }

  }
}
