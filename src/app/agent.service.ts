import {Injectable} from '@angular/core';
import {interval, of, Subject,} from "rxjs";
import {switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private kafka: any[] = [];
  private kafkaProducersPromUrl: string = 'https://prom-telia.egamings.com/api/v1/query?query=kafka_consumergroup_lag_sum';
  private kafkaClusterPromUrl: string = 'https://prom-telia.egamings.com/api/v1/query?query=sum(delta(kafka_consumergroup_current_offset{instance=~\'site1-telia-kafka1-1\',topic=~"(MerchantRequestsNew|MerchantRequestsNe|dwh-WalletAction|dwh-UserSave|dwh-UserLoyaltyPoints|dwh-UserLoyalty|dwh-UserFilter|dwh-UserConversationSave|dwh-UpdateStallBalance|dwh-UpdateNetBalance|dwh-UpdateFreebetsAwarded|dwh-UpdateBonusBalance|dwh-Transaction|dwh-SubAffiliateCommission|dwh-StallSave|dwh-SideBets|dwh-Payment|dwh-OWDepositWithdraw|dwh-NetSave|dwh-MerchantDelta|dwh-LockedWithdrawals|dwh-LastLoginData|dwh-GameLaunch|dwh-GameCorrection|dwh-GameActionBonus|dwh-GameAction|dwh-FreeRoundChanged|dwh-EvoSWSideBets|dwh-EvoSWJackpot|dwh-EvoSWBetBehind|dwh-DepositWithdraw|dwh-BetBehind|dwh-AffiliateVisitor|dwh-AffiliateSave|dwh-AffiliateDepositWithdraw|dwh-AffiliateCommission|docker-connect-statu|docker-connect-offset|docker-connect-config|ApiRequests|ApiRequest|_schema|__confluent\\\\.support\\\\.metric).(1|2|3)"}[5m])/5) by (consumergroup, topic)';
  private kafkaProducingData$: any = new Subject<any>();
  private kafkaClusterData$: any = new Subject<any>();
  private producingMessagesCount: number = 0;
  private kafkaClusterMessagesCount: number = 0;

  constructor(http: HttpClient) {
    this.init(http);
  }

  init(http: HttpClient): void {
    this.producerStatus(http);
    this.kafkaClusterState(http);
  }

  systemExistInArray(system: any): number {
    return this.kafka.findIndex(obj => obj.system === system)
  }

  producerStatus(http: HttpClient) {
    const producerStream$ = interval(15000)
      .pipe(switchMap(() => http.get(this.kafkaProducersPromUrl)));
    producerStream$
      .subscribe({
        next: value => {
          this.kafkaProducingData$ = value
          this.producingMessagesCount = 0;
          for (let i = 0; i < this.kafkaProducingData$.data.result.length; i++) {
            this.producingMessagesCount += +this.kafkaProducingData$.data.result[i].value[1]
          }
          this.writingDataToArray(+this.producingMessagesCount, 'Producers', 500 * 1000)
        }
      });
  }

  kafkaClusterState(http: HttpClient) {
    const kafkaClusterStream$ = interval(15000)
      .pipe(switchMap(() => http.get(this.kafkaClusterPromUrl)));
    kafkaClusterStream$
      .subscribe({
        next: value => {
          this.kafkaClusterData$ = value
          this.kafkaClusterMessagesCount = 0;
          for (let i = 0; i < this.kafkaClusterData$.data.result.length; i++) {
            this.kafkaClusterMessagesCount += +this.kafkaClusterData$.data.result[i].value[1]
          }
          this.writingDataToArray(+this.kafkaClusterMessagesCount.toFixed(), 'Kafka Cluster', 100 * 1000)
        }
      })
  }

  writingDataToArray(messagesCount: number, system: string, limit: number) {
    if (messagesCount < limit) {
      if (this.systemExistInArray(system) < 0) {
        this.kafka.push({
          system: system,
          state: 'Error',
          data: messagesCount
        })
      } else {
        this.kafka[this.systemExistInArray(system)] = {
          system: system,
          state: 'Error',
          data: messagesCount
        }
      }
    } else if (messagesCount >= limit) {
      if (this.systemExistInArray(system) < 0) {
        this.kafka.push({
          system: system,
          state: 'Ok',
          data: messagesCount
        })
      } else {
        this.kafka[this.systemExistInArray(system)] = {
          system: system,
          state: 'Ok',
          data: messagesCount
        }
      }
    }
  }

  get stream$() {
    return of(this.kafka)
  }
}
