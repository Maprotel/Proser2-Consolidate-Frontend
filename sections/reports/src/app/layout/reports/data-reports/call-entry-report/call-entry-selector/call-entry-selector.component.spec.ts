import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallEntrySelectorComponent } from './call-entry-selector.component';

describe('CallEntrySelectorComponent', () => {
  let component: CallEntrySelectorComponent;
  let fixture: ComponentFixture<CallEntrySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallEntrySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallEntrySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
