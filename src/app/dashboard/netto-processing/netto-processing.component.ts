import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-netto-processing',
  templateUrl: './netto-processing.component.html',
  styleUrls: ['./netto-processing.component.css']
})
export class NettoProcessingComponent {

  system: string = 'Netto processing time';
  showSystemBtn: boolean = true;

  constructor() { }

  onClick() {
    this.showSystemBtn = !this.showSystemBtn
  }

}
