import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSuccessComponent } from './appointment-success.component';

describe('AppointmentSuccessComponent', () => {
  let component: AppointmentSuccessComponent;
  let fixture: ComponentFixture<AppointmentSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentSuccessComponent]
    });
    fixture = TestBed.createComponent(AppointmentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
