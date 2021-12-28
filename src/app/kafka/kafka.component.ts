import { Component, OnInit } from '@angular/core';
import {AgentService} from "../agent.service";
import {Observable} from "rxjs";
import {ISystems} from "../isystems";

@Component({
  selector: 'app-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.css']
})

export class KafkaComponent implements OnInit {
  system = 'Kafka';
  title = 'Service Status:';
  showSystemBtn = true;
  systemBtnState = true;
  private readonly goodStream$: Observable<any>;
  private readonly badStream$: Observable<any>;
  private subscription: any;
  systems: ISystems = {
    names: [],
    states: []
  };

  constructor(agent: AgentService) {
    this.goodStream$ = agent.goodStream$;
    this.badStream$ = agent.badStream$;
    this.init(this.goodStream$);
  }
  init(stream: Observable<any>){
    this.subscription = stream.subscribe({
      next: value => {
        if(!this.systems.names.includes(value.system)){
          this.systems.names.push(value.system);
        }
        for(let i = 0; i < this.systems.names.length; i++){
          this.systems.states[i] = value.status;
        }
        console.log(value);
        console.log(this.systems)
      },
      complete: () => console.log("Stream terminated!")
    })
  }

  onClick() {
    this.showSystemBtn = !this.showSystemBtn
  }

  switchStream(state: boolean) {
    if(state){
      this.subscription.unsubscribe();
      this.init(this.goodStream$);
    } else {
      this.subscription.unsubscribe();
      this.init(this.badStream$);
    }
  }

  stopStream() {
    this.subscription.complete();
  }

  ngOnInit(): void {
  }

}
