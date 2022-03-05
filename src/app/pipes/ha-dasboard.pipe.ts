import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'haDasboard'
})
export class HaDasboardPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string | null {
    const months: string[] = [
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
    if(value){
      return months[value];
    } else
      return null;
  }

}
