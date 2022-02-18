import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaNavbarComponent } from './ha-navbar.component';

describe('HaNavbarComponent', () => {
  let component: HaNavbarComponent;
  let fixture: ComponentFixture<HaNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
