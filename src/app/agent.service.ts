import {Injectable} from '@angular/core';
import {from, fromEvent, interval, Observable, of, timer} from "rxjs";
import {map, mapTo, startWith, switchMap, tap} from "rxjs/operators";
import {IResponse} from "./iresponse";

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private kafkaPart: string[] = ['funcore', 'producer', 'kafkaServer', 'consumer', 'DWH'];
  public goodStream$;
  public badStream$;

  constructor() {
    this.goodStream$ = this.createStream();
    this.badStream$ = this.createBadStream();
  }

  createStream(): Observable<any> {
    const interval$: Observable<any> = interval(1000);

    return interval$
      .pipe(
        switchMap(() => {
          return from(this.kafkaPart).pipe(
            // tap(value => console.log(value)),
            map(value => {
              return {
                system: value,
                status: 'Ok',
                data: 'System online and kicking'
              }
            })
          )
        })
      )
  }
  createBadStream(): Observable<any> {
    const interval$: Observable<any> = interval(1000);

    return interval$
      .pipe(
        switchMap(() => {
          return from(this.kafkaPart).pipe(
            // tap(value => console.log(value)),
            map(value => {
              return {
                system: value,
                status: 'Error',
                data: 'System offline and dead'
              }
            })
          )
        })
      )
  }
}
