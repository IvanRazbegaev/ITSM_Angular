import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IncidentPipe} from "./incident.pipe";
import { HaDasboardPipe } from './ha-dasboard.pipe';



@NgModule({
  declarations: [
    IncidentPipe,
    HaDasboardPipe
  ],
  imports: [
    CommonModule
  ],
    exports: [
        IncidentPipe,
        HaDasboardPipe
    ]
})
export class PipeModule { }
