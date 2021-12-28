import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-kafka-system',
  templateUrl: './kafka-system.component.html',
  styleUrls: ['./kafka-system.component.css']
})
export class KafkaSystemComponent implements OnInit {

  @Input('system-name') system: string = '';
  @Input('state') state: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
