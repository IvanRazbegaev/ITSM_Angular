import { Component, OnInit } from '@angular/core';
import {AgentService} from "../agent.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.css']
})

export class KafkaComponent implements OnInit {
  system = 'Kafka';
  title = 'Service Status:';

  showSystemBtn = true;

  public readonly goodStream$: Observable<any>;
  public readonly badStream$: Observable<any>;
  public readonly mixedStream$: Observable<any>;

  private subscription: any;

  systems: {name: any, state: any}[] = [];

  constructor(agent: AgentService) {
    this.goodStream$ = agent.goodStream$;
    this.badStream$ = agent.badStream$;
    this.mixedStream$ = agent.mixedStream$;
    this.init(this.goodStream$);
  }
  init(stream: Observable<any>){
    this.system = 'Kafka'
    this.subscription = stream.subscribe({
      next: value => {
        const id = this.systems.findIndex(obj => obj.name === value.system);
          if(id < 0){
            this.systems.push({
              name: value.system,
              state: value.status
            });
          } else {
            if(this.systems[id].state !== value.status){
              this.systems[id].state = value.status
            }
          }
      },
      complete: () => console.log("Stream terminated!")
    })
  }

  onClick() {
    this.showSystemBtn = !this.showSystemBtn
  }

  switchStream(stream: Observable<any>) {
      this.subscription.unsubscribe();
      this.init(stream);
  }

  stopStream() {
    this.subscription.complete();
    this.system = 'No stream detected!'
    for (let i = 0; i < this.systems.length; i++) {
      this.systems[i].state = 'No data';
    }
  }

  systemStatusCheck(): boolean {

    for (const system of this.systems) {
      if(system.state.includes('Error') || this.subscription.closed) {
        return false;
      }
    }
    return true;
  }

  ngOnInit(): void {
  }

}
