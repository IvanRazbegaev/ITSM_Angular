import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AgentService} from "./agent.service";
import { KafkaComponent } from './dashboard/kafka/kafka.component';
import { KafkaSystemComponent } from './dashboard/kafka-system/kafka-system.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from "@angular/material/expansion";
import {TrackerComponent} from "./incidents-tracker/tracker/tracker.component";
import {IncidentsTrackerModule} from "./incidents-tracker/incidents-tracker.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {HttpClientModule} from "@angular/common/http";
import { NettoProcessingComponent } from './dashboard/netto-processing/netto-processing.component';

@NgModule({
  declarations: [
    AppComponent,
    KafkaComponent,
    KafkaSystemComponent,
    NettoProcessingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    IncidentsTrackerModule,
    MatButtonToggleModule,
    HttpClientModule
  ],
  providers: [
    AgentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
