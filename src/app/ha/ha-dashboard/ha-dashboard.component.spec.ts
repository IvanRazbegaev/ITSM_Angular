import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaDashboardComponent } from './ha-dashboard.component';

describe('HaDashboardComponent', () => {
  let component: HaDashboardComponent;
  let fixture: ComponentFixture<HaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
