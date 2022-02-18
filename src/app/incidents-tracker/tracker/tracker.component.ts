import {Component, OnInit} from '@angular/core';
import {TrackerBackendService} from "../../services/tracker-backend.service";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  datePicker: FormGroup;
  resultArray: any[] = [];

  public isExpanded: boolean = false;
  public parsedIncidentsArray: any[] = [];

  constructor(private response: TrackerBackendService) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getDate()

    this.datePicker = new FormGroup({
      start: new FormControl(new Date(year, month, day - 7)),
      end: new FormControl(new Date(year, month, day)),
    });
  }

  init() {
    this.parsedIncidentsArray = [];
    const requestBody = this.getPickedDate();
    if(requestBody.start !== null && requestBody.end !== null){
      this.response.getAllIncidents(requestBody.start, requestBody.end)
        .subscribe(value => {
          this.resultArray = value;
        })
    }
  }

  ngOnInit(): void {
    this.init()
  }

  getPickedDate(): {start: number, end: number} {
    return {
      start: this.datePicker.get('start')?.value,
      end: this.datePicker.get('end')?.value
    }
  }

  checkForIncidents(): void {
    this.response.checkForIncidents()
      .subscribe(value => {
        this.init();
      })

  }

}
