import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './tracker/tracker.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { IncidentWeekComponent } from './incident-week/incident-week.component';



@NgModule({
  declarations: [
    TrackerComponent,
    IncidentWeekComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  exports: [
    TrackerComponent
  ]
})
export class IncidentsTrackerModule { }
