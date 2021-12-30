import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './tracker/tracker.component';
import {MatExpansionModule} from "@angular/material/expansion";



@NgModule({
  declarations: [
    TrackerComponent
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
