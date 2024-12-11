import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookingComponent } from './manage-booking.component';

describe('ManageBookingComponent', () => {
  let component: ManageBookingComponent;
  let fixture: ComponentFixture<ManageBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageBookingComponent]
    });
    fixture = TestBed.createComponent(ManageBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
