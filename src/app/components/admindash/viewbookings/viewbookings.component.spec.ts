import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbookingsComponent } from './viewbookings.component';

describe('ViewbookingsComponent', () => {
  let component: ViewbookingsComponent;
  let fixture: ComponentFixture<ViewbookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewbookingsComponent]
    });
    fixture = TestBed.createComponent(ViewbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
