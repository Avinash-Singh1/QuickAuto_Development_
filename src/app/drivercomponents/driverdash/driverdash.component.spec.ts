import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverdashComponent } from './driverdash.component';

describe('DriverdashComponent', () => {
  let component: DriverdashComponent;
  let fixture: ComponentFixture<DriverdashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverdashComponent]
    });
    fixture = TestBed.createComponent(DriverdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
