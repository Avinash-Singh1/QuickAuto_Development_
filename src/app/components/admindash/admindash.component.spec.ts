import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashComponent } from './admindash.component';

describe('AdmindashComponent', () => {
  let component: AdmindashComponent;
  let fixture: ComponentFixture<AdmindashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindashComponent]
    });
    fixture = TestBed.createComponent(AdmindashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
