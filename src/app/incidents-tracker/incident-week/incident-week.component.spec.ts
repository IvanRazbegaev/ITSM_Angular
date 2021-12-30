import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentWeekComponent } from './incident-week.component';

describe('IncidentWeekComponent', () => {
  let component: IncidentWeekComponent;
  let fixture: ComponentFixture<IncidentWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
