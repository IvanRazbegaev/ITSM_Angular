import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AgentService} from "../../services/agent.service";

@Component({
  selector: 'app-netto-processing',
  templateUrl: './netto-processing.component.html',
  styleUrls: ['./netto-processing.component.css']
})
export class NettoProcessingComponent {

  @Output('netto-selected') nettoSelected = new EventEmitter()

  system: string = 'Netto processing time';
  showSystemBtn: boolean = true;

  constructor() {
  }

  onClick() {
    this.showSystemBtn = !this.showSystemBtn;
    if (this.showSystemBtn) {
      this.nettoSelected.emit({
        system: 'all',
        state: this.showSystemBtn
      });
    } else {
        this.nettoSelected.emit({
          system: 'netto-processing',
          state: this.showSystemBtn
        });
    }
  }
}
