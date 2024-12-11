import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnalyticsComponent } from './view-analytics.component';

describe('ViewAnalyticsComponent', () => {
  let component: ViewAnalyticsComponent;
  let fixture: ComponentFixture<ViewAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAnalyticsComponent]
    });
    fixture = TestBed.createComponent(ViewAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
