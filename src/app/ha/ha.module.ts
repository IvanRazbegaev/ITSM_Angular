import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HaDashboardComponent } from './ha-dashboard/ha-dashboard.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {PipeModule} from "../pipes/pipe.module";
import { HaNavbarComponent } from './ha-navbar/ha-navbar.component';
import { HaOverallDashboardComponent } from './ha-overall-dashboard/ha-overall-dashboard.component';
import {RouterModule} from "@angular/router";
import { HaComponent } from './ha/ha.component';

@NgModule({
  declarations: [
    HaDashboardComponent,
    HaNavbarComponent,
    HaOverallDashboardComponent,
    HaComponent,
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    PipeModule,
    RouterModule
  ]
})
export class HaModule { }
