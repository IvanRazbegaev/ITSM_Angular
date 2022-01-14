import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kafka-system',
  templateUrl: './kafka-system.component.html',
  styleUrls: ['./kafka-system.component.css']
})
export class KafkaSystemComponent {

  @Input('system-name') system: string = '';
  @Input('state') state: string = '';
  @Input('system-data') data: number = 0;

}
