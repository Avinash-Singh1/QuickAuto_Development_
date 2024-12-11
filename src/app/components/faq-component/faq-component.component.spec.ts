import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqComponentComponent } from './faq-component.component';

describe('FaqComponentComponent', () => {
  let component: FaqComponentComponent;
  let fixture: ComponentFixture<FaqComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqComponentComponent]
    });
    fixture = TestBed.createComponent(FaqComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
