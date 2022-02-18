import { Component, OnInit } from '@angular/core';
import {HaBackendService} from "../../services/ha-backend.service";


@Component({
  selector: 'app-ha-dashboard',
  templateUrl: './ha-dashboard.component.html',
  styleUrls: ['./ha-dashboard.component.css'],
})
export class HaDashboardComponent implements OnInit {

  months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Jule",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  displayedColumns: string[] = ["Downtime's Start", "Downtime's End", "Downtime's Length", "Downtime's Limit", 'Classification', 'Comments'];

  years: number[] = [];
  result: any[] = [];
  selectedMonth: any;
  selectedYear: any;
  ha: number = 0;

  constructor(private response: HaBackendService) { }

  ngOnInit(): void {
    for (let i = 3; i > 0; i--) {
      this.years.push(new Date().getFullYear() - i + 1);
    }
  }

  onCheckButtonClick(): void {
    const monthSelected = this.getSelectedMonth();
    const yearSelected = this.selectedYear;
    if(monthSelected !== undefined && yearSelected !== undefined){
      console.log(monthSelected);
      console.log(yearSelected);
      this.response.getHaForMonth(monthSelected, yearSelected, 0.2)!
        .subscribe(result => {
          this.result = result;
          this.ha = this.haCalculation(this.result);
        })
    }
  }

  getSelectedMonth(): number {
    const monthSelected = this.months.indexOf(this.selectedMonth) + 1;
    return monthSelected;
  }

  haCalculation(array: any[]): number{
    let result: number;
    let downtimeLengthInMinutes: number = 0;

    const monthLengthInTimestamp = Date.parse(new Date(this.selectedYear, this.getSelectedMonth(), 1).toJSON()) - Date.parse(new Date(this.selectedYear, this.getSelectedMonth() - 1, 1).toJSON())
    const monthLengthInMinutes = monthLengthInTimestamp / (60 * 1000);

    for (let i = 0; i < array.length; i++) {
      downtimeLengthInMinutes += array[i].downtimeLength
    }

    result = +((monthLengthInMinutes - downtimeLengthInMinutes)/ monthLengthInMinutes * 100).toFixed(2)

    return result;
  }

}
