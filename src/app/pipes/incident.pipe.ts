import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incident'
})
export class IncidentPipe implements PipeTransform {

  transform(value: any, column: string, incStart?: string | undefined, ...args: any[]): any | null {


    if (column === "id"){
      return value
    } else if (column === "incTime"){
      return this.convertToLocalDateTime(value, incStart)
    } else if (column === "incLength"){
      return `${value + 2}`
    } else if(column === 'shortDesc'){

      let nodes: number[] = []
      let responseTime: string = '';
      const array = value.split(',')

      for (const element of array){
        if(this.isNumber(element)){
          responseTime = Number(element).toFixed(3)
        } else {
          if(element.search('loggingdb1') > 0){
            nodes.push(1);
          } else if(element.search('loggingdb2') > 0){
            nodes.push(2);
          }else if(element.search('loggingdb3') > 0){
            nodes.push(3);
          }
        }
      }
      if(nodes.length === 1){
        return `Затронута нода ${nodes}, выброс составил ${responseTime} ms`
      } else if (nodes.length > 1){
        return `Затронуты ноды ${nodes.sort()}. Самый большой выброс составил ${responseTime} ms`
      }
    } else {
      return value
    }
  }

  convertToLocalDateTime(str: string, incStart:string | undefined): string {
    let date, time;
    if(incStart === "yes"){
      date = new Date(Date.parse(str)).toLocaleDateString();
      time = new Date(Date.parse(str) - 1 * 60 * 1000 ).toLocaleTimeString();
    } else if ("no"){
      date = new Date(Date.parse(str)).toLocaleDateString();
      time = new Date(Date.parse(str) + 1 * 60 * 1000 ).toLocaleTimeString();
    } else {
      throw new Error("Недопустимое значение для параметра incStart")
    }
    return `${date} ${time}`;
  }

  isNumber(str: string): boolean{
    return (isFinite(Number(str)) && !isNaN(Number(str)))
  }

}
