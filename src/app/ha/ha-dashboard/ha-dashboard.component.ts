import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  displayedColumns: string[] = ["Downtime's Start", "Downtime's End", "Downtime's Length", 'Classification', 'Comments', 'Incident Ref ID', 'Menu'];

  years: number[] = [];
  result06: any[] = [];
  result10: any[] = [];
  selectedMonth: any;
  selectedYear: any;
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
  dataReceivingInProgress: boolean = false;

  constructor(private response: HaBackendService) {
  }

  ngOnInit(): void {
    for (let i = 3; i > 0; i--) {
      this.years.push(new Date().getFullYear() - i + 1);
    }
  }

  onCheckButtonClick(): void {
    const monthSelected = this.getSelectedMonth();
    const yearSelected = this.selectedYear;
    if(monthSelected !== undefined && yearSelected !== undefined){
      this.response.getHaForMonth(monthSelected, yearSelected, 0.6)!
        .subscribe(result => {
          this.result06 = result;
          this.ha06 = this.haCalculation(this.result06);
        })
      this.response.getHaForMonth(monthSelected, yearSelected, 1)!
        .subscribe(result => {
          this.result10 = result;
          this.ha10 = this.haCalculation(this.result10);
        })
    }
  }

  getSelectedMonth(): number {
    const monthSelected = this.months.indexOf(this.selectedMonth) + 1;
    return monthSelected;
  }

  haCalculation(array: any[]): {firstNodeHa: number, secondNodeHa: number, thirdNodeHa: number, allNodesHa: number} {
    let firstNodeHa = 0;
    let secondNodeHa = 0;
    let thirdNodeHa = 0;
    let allNodesHa = 0;

    let firstDowntimeLengthInMinutes: number = 0;
    let secondDowntimeLengthInMinutes: number = 0;
    let thirdDowntimeLengthInMinutes: number = 0;
    let allDowntimeLengthInMinutes: number;

    const monthLengthInTimestamp = Date.parse(new Date(this.selectedYear, this.getSelectedMonth(), 1).toJSON()) - Date.parse(new Date(this.selectedYear, this.getSelectedMonth() - 1, 1).toJSON())
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
    //TODO Переделать расчет даунтайма для всех нод с проверкой общего даунтайма
    allDowntimeLengthInMinutes = this.allNodesDowntime(array);

    firstNodeHa = roundResult((monthLengthInMinutes - firstDowntimeLengthInMinutes)/ monthLengthInMinutes * 100)
    secondNodeHa = roundResult((monthLengthInMinutes - secondDowntimeLengthInMinutes)/ monthLengthInMinutes * 100)
    thirdNodeHa = roundResult((monthLengthInMinutes - thirdDowntimeLengthInMinutes)/ monthLengthInMinutes * 100)
    allNodesHa = roundResult((monthLengthInMinutes - allDowntimeLengthInMinutes)/ monthLengthInMinutes * 100)

    return {firstNodeHa, secondNodeHa, thirdNodeHa, allNodesHa};
  }

  calculateHaForMonth() {
    this.dataReceivingInProgress = true;
    this.result06 = [];
    this.result10 = [];
    const monthSelected = this.getSelectedMonth();
    const yearSelected = this.selectedYear;
    this.response.checkSystemForDowntimes(monthSelected, yearSelected, 0.6)
      .subscribe(result => console.log(result));

    this.response.checkSystemForDowntimes(monthSelected, yearSelected, 1)
      .subscribe(result =>{
        console.log(result)
      })
    this.response.checkSystemForDowntimes(monthSelected, yearSelected)
      .subscribe(result =>{
        console.log(result)
        this.dataReceivingInProgress = false;
        this.onCheckButtonClick()
      })

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

  logDowntime(obj: any[]){
    console.log(obj)
  }

  openDashboard(obj: {downtimeStart: string, downtimeEnd: string, downtimeLength: number, host: string}): void {

    let panel;

    const convertIsoToTimestamp = (date: string): number => {
      return Date.parse(date)
    }

    const timezoneOffset = Math.abs(new Date().getTimezoneOffset())

    const dateTimeStart = convertIsoToTimestamp(obj.downtimeStart) - (20 * 60 * 1000) + (timezoneOffset * 60 * 1000)
    const dateTimeEnd = convertIsoToTimestamp(obj.downtimeEnd) + (20 * 60 * 1000) + (timezoneOffset * 60 * 1000)

    if(obj.host === 'apiprod.fundist.org'){
      panel = 184
    } else if(obj.host === 'apiprod2.fundist.org'){
      panel = 193
    } else if(obj.host === 'apiprod3.fundist.org'){
      panel = 224
    }

    let url = `https://dashboard.egamings.com/d/000000006/business-operations?orgId=1&from=${dateTimeStart}&to=${dateTimeEnd}&viewPanel=${panel}`

    window.open(url, '_blank')
  }

  deleteDowntime(obj: {id:number}): void{
    const confirmMessage = confirm('Вы уверены, что хотите удалить этот даунтайм?')
    if(confirmMessage){
      this.response.deleteDowntime(obj.id)
        .subscribe(result => {
          console.log(result)
          this.onCheckButtonClick()
        })
    }
  }

}
