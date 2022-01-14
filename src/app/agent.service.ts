import {Injectable} from '@angular/core';
import {interval, of, Subject,} from "rxjs";
import { switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private kafka: any[] = [];
  private kafkaProducersPromUrl: string = 'https://prom-telia.egamings.com/api/v1/query?query=kafka_consumergroup_lag_sum';
  private kafkaClusterPromUrl: string = 'https://prom-telia.egamings.com/api/v1/query?query=kafka_consumergroup_current_offset_sum';
  private kafkaProducingData$: any = new Subject<any>();
  private kafkaClusterData$: any = new Subject<any>();
  private producingMessagesCount: number = 0;
  private kafkaClusterMessagesCount: number = 0;

  constructor(http: HttpClient) {
    this.init(http);
  }

  init(http: HttpClient): void {
    this.producerStatus(http);
    this.kafkaClusterState(http)
  }

  systemExistInArray(system: any): number {
    return this.kafka.findIndex(obj => obj.system === system)
  }

  producerStatus(http: HttpClient) {
    const stream$ = interval(15000)
      .pipe(switchMap(() => http.get(this.kafkaProducersPromUrl)))
    this.kafkaProducingData$ = stream$
      .subscribe(value => {
        this.kafkaProducingData$ = value
        this.producingMessagesCount = 0;
        for(let i = 0; i < this.kafkaProducingData$.data.result.length; i++){
          this.producingMessagesCount += +this.kafkaProducingData$.data.result[i].value[1]
        }

        if(this.producingMessagesCount < 100 * 1000){
          if(this.systemExistInArray('Producers') < 0){
            this.kafka.push({
              system: 'Producers',
              state: 'Error',
              data: this.producingMessagesCount
            })
          } else {
            this.kafka[this.systemExistInArray('Producers')] = {
              system: 'Producers',
              state: 'Error',
              data: this.producingMessagesCount
            }
          }
        } else if (this.producingMessagesCount >= 100 * 1000){
          if(this.systemExistInArray('Producers') < 0){
            this.kafka.push({
              system: 'Producers',
              state: 'Ok',
              data: this.producingMessagesCount
            })
          } else {
            this.kafka[this.systemExistInArray('Producers')] = {
              system: 'Producers',
              state: 'Ok',
              data: this.producingMessagesCount
            }
          }
        }
      });
  }

  kafkaClusterState(http: HttpClient) {
    const stream$ = interval(15000)
      .pipe(switchMap(() => http.get(this.kafkaClusterPromUrl)))
    stream$.subscribe({
      next: value => {
        this.kafkaClusterData$ = value
        this.kafkaClusterMessagesCount = 0;
        for(let i = 0; i < this.kafkaClusterData$.data.result.length; i++){
          this.kafkaClusterMessagesCount += +this.kafkaClusterData$.data.result[i].value[1]
        }

        if(this.kafkaClusterMessagesCount < 100 * 1000){
          if(this.systemExistInArray('Kafka Cluster') < 0){
            this.kafka.push({
              system: 'Kafka Cluster',
              state: 'Error',
              data: this.kafkaClusterMessagesCount
            })
          } else {
            this.kafka[this.systemExistInArray('Kafka Cluster')] = {
              system: 'Kafka Cluster',
              state: 'Error',
              data: this.kafkaClusterMessagesCount
            }
          }
        } else if (this.kafkaClusterMessagesCount >= 100 * 1000){
          if(this.systemExistInArray('Kafka Cluster') < 0){
            this.kafka.push({
              system: 'Kafka Cluster',
              state: 'Ok',
              data: this.kafkaClusterMessagesCount
            })
          } else {
            this.kafka[this.systemExistInArray('Kafka Cluster')] = {
              system: 'Kafka Cluster',
              state: 'Ok',
              data: this.kafkaClusterMessagesCount
            }
          }
        }
        console.log(this.kafka)
      }
    })
  }

  get stream$() {
    return of(this.kafka)
  }
}
