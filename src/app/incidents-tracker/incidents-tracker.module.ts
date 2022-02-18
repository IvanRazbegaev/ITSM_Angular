import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './tracker/tracker.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { IncidentWeekComponent } from './incident-week/incident-week.component';
import {MatTableModule} from "@angular/material/table";
import {PipeModule} from "../pipes/pipe.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    TrackerComponent,
    IncidentWeekComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    PipeModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  exports: [
    TrackerComponent
  ]
})
export class IncidentsTrackerModule { }
