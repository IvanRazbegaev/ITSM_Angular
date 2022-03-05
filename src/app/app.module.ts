import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AgentService} from "./services/agent.service";
import { KafkaComponent } from './dashboard/kafka/kafka.component';
import { KafkaSystemComponent } from './dashboard/kafka-system/kafka-system.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from "@angular/material/expansion";
import {TrackerComponent} from "./incidents-tracker/tracker/tracker.component";
import {IncidentsTrackerModule} from "./incidents-tracker/incidents-tracker.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {HttpClientModule} from "@angular/common/http";
import { NettoProcessingComponent } from './dashboard/netto-processing/netto-processing.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {PipeModule} from "./pipes/pipe.module";
import {HaModule} from "./ha/ha.module";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {HaComponent} from "./ha/ha/ha.component";
import {HaDashboardComponent} from "./ha/ha-dashboard/ha-dashboard.component";
import {HaOverallDashboardComponent} from "./ha/ha-overall-dashboard/ha-overall-dashboard.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    KafkaComponent,
    KafkaSystemComponent,
    NettoProcessingComponent,
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    IncidentsTrackerModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    HttpClientModule,
    PipeModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'incident-tracker',
        component: TrackerComponent
      },
      {
        path: 'ha-dashboard',
        component: HaComponent,
        children:[
          {
            path: 'month',
            component: HaDashboardComponent,
          },
          {
            path: 'overall',
            component: HaOverallDashboardComponent,
          },
        ]
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]),
    HaModule,
  ],
  providers: [
    AgentService,
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
