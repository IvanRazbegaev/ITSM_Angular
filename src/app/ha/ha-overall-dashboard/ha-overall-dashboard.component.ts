import { Component, OnInit } from '@angular/core';
import {HaBackendService} from "../../services/ha-backend.service";

@Component({
  selector: 'app-ha-overall-dashboard',
  templateUrl: './ha-overall-dashboard.component.html',
  styleUrls: ['./ha-overall-dashboard.component.css']
})
export class HaOverallDashboardComponent {
  result06: {
    id: 0;
    downtimeStart: '';
    downtimeEnd: '';
    downtimeLength: 0;
    highLimit: 0;
    host: '';
    incidentRef: '';
  } | undefined
  result10: {
    id: 0;
    downtimeStart: '';
    downtimeEnd: '';
    downtimeLength: 0;
    highLimit: 0;
    host: '';
    incidentRef: '';
  } | undefined

  ha06: { firstNodeHa: number; secondNodeHa: number; thirdNodeHa: number; allNodesHa: number } = {
    firstNodeHa: 0,
    secondNodeHa: 0,
    thirdNodeHa: 0,
    allNodesHa: 0
  }

  ha10: { firstNodeHa: number; secondNodeHa: number; thirdNodeHa: number; allNodesHa: number } = {
    firstNodeHa: 0,
    secondNodeHa: 0,
    thirdNodeHa: 0,
    allNodesHa: 0
  }

  yearArray: any[] = [];
  monthArray: any[] = [];

  constructor(private response: HaBackendService) {
    this.init()
  }
  init(){
    this.response.getHaForMonth()
      .subscribe(result => {
        const limitArray = this.filterResultArrayByLimit(result);
        this.getMonthsAndYearFromArray(result);
        this.result06 = limitArray[0].limit06;
        this.result10 = limitArray[1].limit10;
      })
  }

  filterResultByDate(array: any, month: number, year: number): any[]{
    const res: any[] = [];
    array.filter((item: { downtimeStart: string; }) => {
      const downtimeYear = this.convertIsoToDate(item.downtimeStart).getFullYear();
      const downtimeMonth = this.convertIsoToDate(item.downtimeStart).getMonth();
      if (downtimeYear === year && downtimeMonth === month)
        res.push(item)
    })
    return res;
  }

  filterResultArrayByLimit(array: any[]): any[] {
    let res = [];

    const res06 = array.filter(item => {
      if(item.highLimit === 0.6 || item.highLimit === null){
        return item;
      }
    })

    const res10 = array.filter(item => {
      if(item.highLimit === 1 || item.highLimit === null){
        return item;
      }
    })

    res.push({limit06: res06}, {limit10: res10});

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

  haCalculation(array: any[], month: number, year: number): {firstNodeHa: number, secondNodeHa: number, thirdNodeHa: number, allNodesHa: number} {
    let firstNodeHa = 0;
    let secondNodeHa = 0;
    let thirdNodeHa = 0;
    let allNodesHa = 0;

    let firstDowntimeLengthInMinutes: number = 0;
    let secondDowntimeLengthInMinutes: number = 0;
    let thirdDowntimeLengthInMinutes: number = 0;
    let allDowntimeLengthInMinutes: number;

    const monthLengthInTimestamp = Date.parse(new Date(year, month + 1, 1).toJSON()) - Date.parse(new Date(year, month, 1).toJSON())
    const monthLengthInMinutes = monthLengthInTimestamp / (60 * 1000);

    for (let i = 0; i < array.length; i++) {
      if(array[i].host === 'apiprod.fundist.org'){
        firstDowntimeLengthInMinutes += array[i].downtimeLength;
      } else if(array[i].host === 'apiprod2.fundist.org'){
        secondDowntimeLengthInMinutes += array[i].downtimeLength;
      } else if(array[i].host === 'apiprod3.fundist.org'){
        thirdDowntimeLengthInMinutes += array[i].downtimeLength;
      }
    }

    const roundResult = (result: number): number => {
      return +Math.floor(result * 1000).toFixed() / 1000;
    }

    allDowntimeLengthInMinutes = this.allNodesDowntime(array);

    firstNodeHa = roundResult((monthLengthInMinutes - firstDowntimeLengthInMinutes)/ monthLengthInMinutes * 100)
    secondNodeHa = roundResult((monthLengthInMinutes - secondDowntimeLengthInMinutes)/ monthLengthInMinutes * 100)
    thirdNodeHa = roundResult((monthLengthInMinutes - thirdDowntimeLengthInMinutes)/ monthLengthInMinutes * 100)
    allNodesHa = roundResult((monthLengthInMinutes - allDowntimeLengthInMinutes)/ monthLengthInMinutes * 100)

    return {firstNodeHa, secondNodeHa, thirdNodeHa, allNodesHa};
  }

  allNodesDowntime(array: any[]): number {
    let result: number = 0;
    const timeStampArray: any[] = [];
    const downtimeLengthArray: any[] = [];
    const convertDateToTimeStamp = (date: string): number => {
      return Date.parse(date)
    }

    for (let i = 0; i < array.length; i++) {
      result += array[i].downtimeLength
      timeStampArray.push(convertDateToTimeStamp(array[i].downtimeStart));
      downtimeLengthArray.push(array[i].downtimeLength)
    }

    const searchConditionArray = timeStampArray.filter((item,index) => {
      return timeStampArray.indexOf(item) !== index
    })

    for (let i = 0; i < searchConditionArray.length; i++) {
      const indexOfDowntime = timeStampArray.indexOf(searchConditionArray[i])
      result -= downtimeLengthArray[indexOfDowntime]
    }

    return result;
  }
}
