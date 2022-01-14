import {Component, Input} from '@angular/core';
import {AgentService} from "../../agent.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.css']
})

export class KafkaComponent {
  system = 'Kafka';

  showSystemBtn = true;
  public readonly stream$: Observable<any>;
  private subscription: any;
  systems: {system: any, state: any, data: any}[] = [];

  constructor(agent: AgentService) {
    this.stream$ = agent.stream$;
    console.log(this.stream$)
    this.init(this.stream$);
  }
  init(stream: Observable<any>){
    this.system = 'Kafka'
    this.subscription = stream.subscribe({
      next: (value) => {
        this.systems = value;
        console.log(this.systems)
      },
      complete: () => console.log("Stream terminated!")
    })
  }

  onClick() {
    this.showSystemBtn = !this.showSystemBtn;
  }

  systemStatusCheck(): boolean {

    for (const system of this.systems) {
      if(system.state.includes('Error')) {
        return false;
      }
    }
    return true;
  }

}
