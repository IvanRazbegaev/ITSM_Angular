import {Component, OnInit, ViewChild} from '@angular/core';
import {TrackerBackendService} from "../../services/tracker-backend.service";
import {FormControl, FormGroup} from "@angular/forms";
import {CreateIncidentDialogComponent} from "./create-incident-dialog/create-incident-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})

export class TrackerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  datePicker: FormGroup;

  dataSource = new MatTableDataSource();
  incidentParams: { id: number, end_date: string, start_date: string, incident_length: number, short_description: string, comments: string } = {
  id: 0,
  start_date: "",
  end_date: "",
  incident_length: 0,
  short_description: "",
  comments: ""
};

  incidentFromDialog: {incStart: string, incEnd: string, incLength: number, desc: string, comments: string} ={
    incStart:'',
    incEnd:'',
    incLength: 0,
    desc: '',
    comments: ''
  }

  displayedColumns: string[] = ['ID', 'Incident Started', 'Incident Ended', "Incident's Length", 'Description', 'Comments', 'Tools'];

  public isExpanded: boolean = false;
  public parsedIncidentsArray: any[] = [];

  constructor(private response: TrackerBackendService, private dialog:MatDialog) {
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
          this.dataSource = new MatTableDataSource<any>(value);
          this.dataSource.paginator = this.paginator;
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
        console.log(value)
        this.init();
      })

  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateIncidentDialogComponent);


    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.incidentFromDialog = {
          incStart: result.from,
          incEnd: result.to,
          incLength: result.incLength,
          desc: result.desc,
          comments: result.comments
        }
        this.addIncident()
      }
    });
  }

  addIncident(){
    this.response.createNewIncident(this.incidentFromDialog.incStart, this.incidentFromDialog.incEnd, this.incidentFromDialog.incLength, this.incidentFromDialog.desc, this.incidentFromDialog.comments)
      .subscribe(result => {
        console.log(result);
        this.init();
      })
  }
  logParams() {
    console.log(this.incidentParams)
  }

  deleteIncident() {
    const confirmation = confirm("Вы действительно хотите удалить этот инцидент?")
    if (confirmation) {
      this.response.deleteIncident(this.incidentParams.id)
        .subscribe(result => {
          this.init()
        })
    }
  }

}
