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
  data;
  response: string[] = [];
  constructor(data: AgentService) {
    this.data = data;
  }

  showResponse(part: string){
    this.response = JSON.parse(this.data.getStatus(part));
    return this.response;
  }

  setColor(part: string) {
    this.systemBtnState = true;
    this.showResponse(part);
    if(this.response[0] === 'Ok'){
      return this.statusOk
    } else {
      this.systemBtnState = false;
      return this.statusDanger
    }
  }

  onClick() {
    this.showSystemBtn = !this.showSystemBtn
  }


  ngOnInit(): void {
  }

}
