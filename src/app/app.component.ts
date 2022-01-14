import {Component, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Service Status:';
  pageState = 'dashboard';
  subsystemState: string = 'all'

  onClick(state: string): void {
    this.subsystemState = state;
  }
}
