import { Component, OnInit } from '@angular/core';
import {AgentService} from "../agent.service";

@Component({
  selector: 'app-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.css']
})

export class KafkaComponent implements OnInit {
  kafkaPart = ['funcore', 'producer','kafkaServer','consumer','DWH'];
  system = 'Kafka';
  title = 'Service Status:';
  statusOk = 'btn btn-success';
  statusDanger = 'btn btn-danger';
  showSystemBtn = true;
  systemBtnState = true;
  response;

  constructor(data: AgentService) {
    this.response = JSON.parse(data.getStatus(this.kafkaPart));
    this.checkSystem();
  }

  showResponse(part: any){
    return `${part.status} ${part.data}` ;
  }

  setColor(part: any) {
    if(part.status === 'Ok'){
        return this.statusOk
      } else {
        this.systemBtnState = false;
        return this.statusDanger
    }
  }

  checkSystem(){
    for (let i= 0; i < this.response.length; i++){
      if(this.response[i].status === 'Error')
        this.systemBtnState = false;
    }
  }

  onClick() {
    this.showSystemBtn = !this.showSystemBtn
  }
  
  ngOnInit(): void {
  }

}
