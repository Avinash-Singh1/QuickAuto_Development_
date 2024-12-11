import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanjourneyComponent } from './planjourney.component';

describe('PlanjourneyComponent', () => {
  let component: PlanjourneyComponent;
  let fixture: ComponentFixture<PlanjourneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanjourneyComponent]
    });
    fixture = TestBed.createComponent(PlanjourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
