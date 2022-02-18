import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaComponent } from './ha.component';

describe('HaComponent', () => {
  let component: HaComponent;
  let fixture: ComponentFixture<HaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
