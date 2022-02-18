import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-incident-week',
  templateUrl: './incident-week.component.html',
  styleUrls: ['./incident-week.component.css']
})
export class IncidentWeekComponent implements OnInit {

  @Input('week') week: number = 0;
  @Input('currentWeek') currentWeek: number = 0;
  @Input('data') incidents: any[] = []


  displayedColumns: string[] = ['ID', 'Incident Started', 'Incident Ended', "Incident's Length", 'Description', 'Comments'];

  constructor() {
  }

  ngOnInit(): void {

  }

  onClick() {
    console.log(this.incidents)
  }

}
