import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaSystemComponent } from './kafka-system.component';

describe('KafkaSystemComponent', () => {
  let component: KafkaSystemComponent;
  let fixture: ComponentFixture<KafkaSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KafkaSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkaSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
