import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NettoProcessingComponent } from './netto-processing.component';

describe('NettoProcessingComponent', () => {
  let component: NettoProcessingComponent;
  let fixture: ComponentFixture<NettoProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NettoProcessingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NettoProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
