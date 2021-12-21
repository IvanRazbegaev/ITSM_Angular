import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AgentService} from "./agent.service";
import { KafkaComponent } from './kafka/kafka.component';

@NgModule({
  declarations: [
    AppComponent,
    KafkaComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AgentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
