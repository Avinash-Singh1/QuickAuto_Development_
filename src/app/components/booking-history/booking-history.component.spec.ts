import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHistoryComponent } from './booking-history.component';

describe('BookingHistoryComponent', () => {
  let component: BookingHistoryComponent;
  let fixture: ComponentFixture<BookingHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingHistoryComponent]
    });
    fixture = TestBed.createComponent(BookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
