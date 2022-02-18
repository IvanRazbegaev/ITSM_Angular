import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IncidentPipe} from "./incident.pipe";



@NgModule({
  declarations: [
    IncidentPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IncidentPipe
  ]
})
export class PipeModule { }
