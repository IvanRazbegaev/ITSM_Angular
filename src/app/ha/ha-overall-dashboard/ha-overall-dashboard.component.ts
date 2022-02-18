import { Component, OnInit } from '@angular/core';
import {HaBackendService} from "../../services/ha-backend.service";

@Component({
  selector: 'app-ha-overall-dashboard',
  templateUrl: './ha-overall-dashboard.component.html',
  styleUrls: ['./ha-overall-dashboard.component.css']
})
export class HaOverallDashboardComponent implements OnInit {
  result: any[] = [];
  yearArray: any[] = [];
  monthArray: any[] = [];

  constructor(private response: HaBackendService) { }

  ngOnInit(): void {

  }
  init(){
    this.response.getHaForMonth()
      .subscribe(result => {
        const limitArray = this.filterResultArrayByLimit(result);
        const dateArray = this.getMonthsAndYearFromArray(result);

        console.log(this.yearArray)
        console.log(this.monthArray)
      })
  }

  filterResultArrayByLimit(array: any[]): any[] {
    let res = [];

    const res015 = array.filter(item => {
      if(item.highLimit === 0.15){
        return item;
      }
    })

    const res020 = array.filter(item => {
      if(item.highLimit === 0.2){
        return item;
      }
    })

    res.push({limit015: res015}, {limit020: res020});

    return res
  }

  getMonthsAndYearFromArray(array: any[]) {
    for (let i = 0; i < array.length; i++) {
      const year = this.convertIsoToDate(array[i].downtimeStart).getFullYear();
      const month = this.convertIsoToDate(array[i].downtimeStart).getMonth();
      if(this.checkIfDataIsInArray(year, this.yearArray)){
        this.yearArray.push(year)
      }
      if(this.checkIfDataIsInArray(month, this.monthArray)){
        this.monthArray.push(month)
      }
    }
  }

  convertIsoToDate(isoDate: string): Date{
    return new Date(Date.parse(isoDate));
  }

  checkIfDataIsInArray(data: any, array: any[]): boolean {
    return (array.indexOf(data) < 0);
  }

  getDataFromArray(month: number, year: number, array: any[]){
    return array.filter(item => {
      if(this.convertIsoToDate(item.downtimeEnd).getMonth() === month && this.convertIsoToDate(item.downtimeEnd).getFullYear() === year)
        return item;
    })
  }

}
