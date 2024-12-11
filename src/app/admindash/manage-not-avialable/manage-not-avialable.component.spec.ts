import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNotAvialableComponent } from './manage-not-avialable.component';

describe('ManageNotAvialableComponent', () => {
  let component: ManageNotAvialableComponent;
  let fixture: ComponentFixture<ManageNotAvialableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageNotAvialableComponent]
    });
    fixture = TestBed.createComponent(ManageNotAvialableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
