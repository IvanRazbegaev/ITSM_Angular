import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaOverallDashboardComponent } from './ha-overall-dashboard.component';

describe('HaOverallDashboardComponent', () => {
  let component: HaOverallDashboardComponent;
  let fixture: ComponentFixture<HaOverallDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaOverallDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaOverallDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
