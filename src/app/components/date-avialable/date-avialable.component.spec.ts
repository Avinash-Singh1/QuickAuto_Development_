import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateAvialableComponent } from './date-avialable.component';

describe('DateAvialableComponent', () => {
  let component: DateAvialableComponent;
  let fixture: ComponentFixture<DateAvialableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateAvialableComponent]
    });
    fixture = TestBed.createComponent(DateAvialableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
