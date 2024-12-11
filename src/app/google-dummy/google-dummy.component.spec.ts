import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleDummyComponent } from './google-dummy.component';

describe('GoogleDummyComponent', () => {
  let component: GoogleDummyComponent;
  let fixture: ComponentFixture<GoogleDummyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleDummyComponent]
    });
    fixture = TestBed.createComponent(GoogleDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
