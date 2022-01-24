import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AgentService} from "../../services/agent.service";
import {Observable, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-kafka',
  templateUrl: './kafka.component.html',
  styleUrls: ['./kafka.component.css']
})

export class KafkaComponent {

  @Output('kafka-selected') kafkaSelected = new EventEmitter();

  system = 'Kafka';

  showSystemBtn: boolean = true;
  public readonly stream$: Observable<any>;
  private subscription: Subscription = new Subscription();
  systems: {system: any, state: any, data: any}[] = [];

  constructor(agent: AgentService) {
    this.stream$ = agent.stream$;
    this.init(this.stream$);
  }
  init(stream: Observable<any>): void{
    this.system = 'Kafka'
    this.subscription = stream.subscribe({
      next: (value) => {
        this.systems = value;
      },
      complete: () => console.log("Stream terminated!")
    })
  }

  onClick(): void {
    this.showSystemBtn = !this.showSystemBtn;
    if(this.showSystemBtn){
      this.kafkaSelected.emit({
        system: 'all',
        state: this.showSystemBtn
      });
    } else {
      this.kafkaSelected.emit({
        system: 'kafka',
        state: this.showSystemBtn
      });
    }
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
