import { Component, OnInit } from '@angular/core';
// Отрисовать компонент трекера столько раз сколько прошло недель +
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  public readonly currentYear: number;
  public readonly currentWeek: number;
  public readonly weekArray: number[] = [];
  private readonly currentDate: number;
  private readonly yearStart: number;
  private readonly weekStart = { //"Начало" инцидентной недели
    day: 1,
    hour: 18
  }

  constructor() {
    this.currentYear = new Date().getFullYear();
    this.yearStart = Date.parse((new Date(this.currentYear, 0, 1)).toString())/1000;
    this.currentDate = +(Date.now()/1000).toFixed();

    this.currentWeek = +((this.currentDate - this.yearStart)/(7*24*60*60)).toFixed();
    this.init();
  }

  init() {
    for (let i = 1; i <= this.currentWeek; i++){
      this.weekArray.push(i);
    }
  }


  ngOnInit(): void {
  }

}
