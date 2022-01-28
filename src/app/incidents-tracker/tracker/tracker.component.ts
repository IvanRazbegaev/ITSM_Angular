import {Component, OnInit} from '@angular/core';
import {TrackerBackendService} from "../../services/tracker-backend.service";

// Отрисовать компонент трекера столько раз сколько прошло недель +
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  public isExpanded: boolean = false;
  public currentYear: number = 0;
  public currentWeek: number = 0;
  public readonly weekArray: number[] = [];
  private currentDate: number = 0;
  private yearStart: number = 0;
  private readonly weekStart = { //"Начало" инцидентной недели
    day: 1,
    hour: 18
  }

  constructor(private response: TrackerBackendService) {

  }

  init() {
    for (let i = 1; i <= this.currentWeek; i++) {
      this.weekArray.push(i);
    }

    this.response.getAllIncidents()
      .subscribe(value => console.log(value))
  }


  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.yearStart = Date.parse((new Date(this.currentYear, 0, 1)).toString()) / 1000;
    this.currentDate = +(Date.now() / 1000).toFixed();
    this.currentWeek = +((this.currentDate - this.yearStart) / (7 * 24 * 60 * 60)).toFixed();
    this.init();
  }

}
