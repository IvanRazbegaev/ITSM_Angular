import {Component, Input, OnInit} from '@angular/core';
import {TrackerComponent} from "../tracker/tracker.component";

@Component({
  selector: 'app-incident-week',
  templateUrl: './incident-week.component.html',
  styleUrls: ['./incident-week.component.css']
})
export class IncidentWeekComponent implements OnInit {

  @Input('week') week:number = 0;
  currentWeek: number;

  constructor(private readonly activeWeek: TrackerComponent) {
    this.currentWeek = activeWeek.currentWeek
  }

  ngOnInit(): void {
  }

}
